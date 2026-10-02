import os
import glob
from PIL import Image

def extract_frames():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(script_dir, "public")
    output_dir = os.path.join(public_dir, "frames")

    os.makedirs(output_dir, exist_ok=True)

    gif_files = glob.glob(os.path.join(public_dir, "*.gif"))

    if not gif_files:
        print("No .gif files found in public/")
        return

    for gif_path in gif_files:
        gif_name = os.path.basename(gif_path)
        print(f"Processing {gif_name}...")
        
        with Image.open(gif_path) as im:
            total_frames = getattr(im, "n_frames", 1)
            print(f"Extracting {total_frames} frames from {gif_name}...")

            for count in range(total_frames):
                im.seek(count)
                frame_rgba = im.convert("RGBA")
                
                frame_filename = f"frame_{count:03d}.webp"
                frame_path = os.path.join(output_dir, frame_filename)
                
                frame_rgba.save(frame_path, "WEBP", quality=95)
                
                if count == 0:
                    center_path = os.path.join(output_dir, "center.webp")
                    frame_rgba.save(center_path, "WEBP", quality=95)
                
            print(f"Successfully extracted {total_frames} frames to {output_dir}/")

if __name__ == "__main__":
    extract_frames()
