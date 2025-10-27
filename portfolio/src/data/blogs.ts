export type BlogPost = {
  id: string; // slug id
  title: string;
  excerpt: string;
  body: string;
  imageUrl: string;
  tags: string[];
  date: string;
  readingTime: string;
  youtubeId?: string;
  repoUrl?: string;
};

export const blogs: BlogPost[] = [
  {
    id: 'trail-runner-notes',
    title: 'Trail Runner Notes: Dawn Miles',
    excerpt: 'Chasing the sunrise over quiet trails. Gear tweaks, hydration strategy, and why negative splits feel like magic.',
    body: `Chasing the sunrise over quiet trails. Gear tweaks, hydration strategy, and why negative splits feel like magic.

I log cadence, heart rate, elevation, and terrain to shape weekly blocks. Key learnings:
- Warmup sets the tone; keep it easy.
- Negative splits build patience and confidence.
- Hydration: 300–500ml/hr depending on heat.`,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    tags: ['Running', 'Health', 'Outdoors'],
    date: '2024-12-18',
    readingTime: '4 min',
  },
  {
    id: 'brew-journal',
    title: 'Brew Journal: Perfecting the V60',
    excerpt: 'Testing pours and grinds to dial in a sweet, balanced cup. Includes my 3:30 recipe and bloom technique.',
    body: `Testing pours and grinds to dial in a sweet, balanced cup.

Recipe: 15g coffee, 250g water at 94°C, 45s bloom, finish at 3:30. Notes on channeling, paper rinse, and agitation.`,
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    tags: ['Coffee', 'Home Lab'],
    date: '2025-02-03',
    readingTime: '3 min',
  },
  {
    id: 'foto-walk-portraits',
    title: 'Photography Walk: Street Portraits',
    excerpt: 'Learning to make quick connections with strangers. Notes on composition, light, and micro-stories.',
    body: `Learning to make quick connections with strangers. I focus on eye level framing and gentle prompts to bring out micro-stories. 35mm, f/2, soft side light.`,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    tags: ['Photography', 'People'],
    date: '2025-05-27',
    readingTime: '5 min',
  },
  {
    id: 'reading-notes-ai',
    title: 'Reading Notes: AI Research Roundup',
    excerpt: 'Digest of papers: retrieval-augmented agents, efficient fine-tuning at the edge, multi-modal grounding.',
    body: `A weekly digest of papers that caught my eye: retrieval-augmented agents, efficient fine-tuning at the edge, and multi-modal grounding with compact adapters.`,
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
    tags: ['Research', 'AI'],
    date: '2025-06-14',
    readingTime: '6 min',
  },
  {
    id: 'hand-gesture-controlled-led-system',
    title: 'Hand-Gesture Controlled LED System',
    excerpt: 'Real-time computer vision with MediaPipe controlling Arduino LEDs via serial — single-hand finger tracking mapped to LED states.',
    body: `# Hand-Gesture Controlled LED System
## Real-Time Computer Vision & Arduino Integration

---

### 🎯 Project Overview
A complete system that uses computer vision to detect hand gestures in real-time and control LEDs on an Arduino board. The system tracks individual finger movements and provides instant visual feedback through LED control.

### 🔧 Technology Stack
- Python 3.8+ with OpenCV & MediaPipe for hand detection
- Arduino Uno/Nano for LED control
- Serial Communication (PySerial) for real-time data transfer
- Computer Vision for gesture recognition

### 📡 System Architecture
Webcam → MediaPipe → Finger Detection → Serial → Arduino LEDs

### 🎮 How It Works
1. Camera captures live video feed (640x480, 30 FPS)
2. MediaPipe detects hand landmarks (21 points per hand)
3. Algorithm analyzes finger positions to determine which fingers are raised
4. Single command sent to Arduino with all LED states (e.g., "1010")
5. Arduino controls LEDs based on finger detection

### 💡 LED Mapping
Finger to LED mapping with Arduino pins: Thumb→13 (LED 1), Index→12 (LED 2), Middle→11 (LED 3), Ring→10 (LED 4)

### 📊 Command Format
- 4-character commands: "1010" = LED1 ON, LED2 OFF, LED3 ON, LED4 OFF
- Real-time updates: Commands sent only when finger states change
- Automatic shutdown: All LEDs turn OFF when no hand is detected

### ✨ Key Features
- Single Hand Focus for precise control
- Individual Finger Control mapped to LEDs
- LED Persistence while fingers are raised
- Automatic Cleanup when hand is removed
- Real-time Feedback overlay
- Efficient Communication with single combined command

### 🚀 Quick Start
1) Install dependencies: pip install -r requirements.txt
2) Upload Arduino code: hand_gesture_led_controller.ino
3) Run: python hand_gesture_led_controller.py

### 🎯 Usage Examples
- Raise thumb → LED 1 turns ON
- Raise thumb + index → LEDs 1 & 2 turn ON
- Remove hand → All LEDs turn OFF automatically
- Multiple fingers → Multiple LEDs can be ON simultaneously

### 🔧 Hardware Requirements
- Arduino board (Uno, Nano, or compatible)
- 4 LEDs with 220Ω resistors
- Webcam (USB or built-in)
- Jumper wires for connections

### 📁 Project Files
- hand_gesture_led_controller.py — Main Python application
- hand_gesture_led_controller.ino — Arduino code
- requirements.txt — Python dependencies
- test_system.py — Component testing utility
- install.bat / install.sh — Automated installation scripts

### 🎉 Project Highlights
- Real-time performance with ~30 FPS
- Robust error handling and reconnection
- Cross-platform support (Windows, Linux, Mac)
- Modular design and clear docs

Built with ❤️ using Python, OpenCV, MediaPipe, and Arduino`,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    tags: ['Computer Vision', 'Arduino', 'Python'],
    date: '2025-10-28',
    readingTime: '7 min',
    // Add your YouTube video ID and repository URL below to enable playback and link rendering
    // youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
    // repoUrl: 'https://github.com/your-username/your-repo',
  },
];
