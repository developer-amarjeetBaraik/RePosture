import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["MEDIAPIPE_DISABLE_GPU"] = "1"


import sys
import cv2
import mediapipe as mp
import math
import json

video_path = sys.argv[1]

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    min_detection_confidence=0.5,
    model_complexity=1,  # You can keep this if needed
    enable_segmentation=False
)

mp_drawing = mp.solutions.drawing_utils

def calculate_angle(a, b, c):
    angle = math.degrees(
        math.atan2(c[1] - b[1], c[0] - b[0]) -
        math.atan2(a[1] - b[1], a[0] - b[0])
    )
    return abs(angle if angle >= 0 else angle + 360)

def get_landmark(landmarks, idx, width, height):
    lm = landmarks[idx]
    return (int(lm.x * width), int(lm.y * height))

def analyze_posture(frame_index, landmarks, width, height):
    results = []

    left_shoulder = get_landmark(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER, width, height)
    left_hip = get_landmark(landmarks, mp_pose.PoseLandmark.LEFT_HIP, width, height)
    left_knee = get_landmark(landmarks, mp_pose.PoseLandmark.LEFT_KNEE, width, height)
    left_ankle = get_landmark(landmarks, mp_pose.PoseLandmark.LEFT_ANKLE, width, height)

    back_angle = calculate_angle(left_shoulder, left_hip, left_knee)
    if back_angle < 150:
        results.append({
            "timestamp": round(frame_index / fps, 2),

            "issue": f"Back angle < 150° ({int(back_angle)}°)",
            "point": left_hip  # For canvas
        })

    if left_knee[0] > left_ankle[0] + 20:
        results.append({
            "timestamp": round(frame_index / fps, 2),
            "issue": "Knee over toe",
            "point": left_knee  # For canvas
        })

    return results

# Main logic
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
bad_postures = []
frame_index = 0

required_landmarks = [
    mp_pose.PoseLandmark.LEFT_SHOULDER,
    mp_pose.PoseLandmark.LEFT_HIP,
    mp_pose.PoseLandmark.LEFT_KNEE,
    mp_pose.PoseLandmark.LEFT_ANKLE
]

pose_frames_detected = 0
frames_missing_landmarks = 0

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break

    height, width, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)

    if results.pose_landmarks:
        pose_frames_detected += 1
        visible = 0
        for lm in required_landmarks:
            point = results.pose_landmarks.landmark[lm]
            if point.visibility > 0.4:
                visible += 1
        if visible < len(required_landmarks) * 0.4:
            frames_missing_landmarks += 1
        else:
            issues = analyze_posture(frame_index, results.pose_landmarks.landmark, width, height)
            bad_postures.extend(issues)

    frame_index += 1

cap.release()
pose.close()

# Final Decision Logic
if pose_frames_detected == 0:
    print(json.dumps({
        "status": "error",
        "message": "No human detected. Please upload a workout video with clear side view."
    }))
elif frames_missing_landmarks > pose_frames_detected * 0.6:
    print(json.dumps({
        "status": "error",
        "message": "Key body parts not visible in most frames. Please upload a clearer video showing full body from the side."
    }))
elif len(bad_postures) > 0:
    print(json.dumps({
        "status": "success",
        "bad_postures": bad_postures
    }))
else:
    print(json.dumps({
        "status": "error",
        "message": "Something went wrong during analysis. Try again with a better video."
    }))
