from PIL import Image, ImageSequence
import os

output_dir = "public/frames"
os.makedirs(output_dir, exist_ok=True)

gif_path = "public/character.gif"

with Image.open(gif_path) as img:
    count = 0
    for frame in ImageSequence.Iterator(img):
        rgb_frame = frame.convert('RGB')
        frame_name = f"{output_dir}/frame_{count:03d}.webp"
        rgb_frame.save(frame_name, 'WEBP', quality=95)
        
        if count == 0:
            rgb_frame.save(f"{output_dir}/center.webp", 'WEBP', quality=95)
            
        count += 1

print(f"Extracted {count} frames using Pillow!")