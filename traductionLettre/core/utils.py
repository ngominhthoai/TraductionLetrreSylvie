from openai import OpenAI
import time
from dotenv import load_dotenv
load_dotenv()  # Tải biến môi trường từ file .env
import os


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Khởi tạo client với API key từ biến môi trường

def translate_text(text, attempts=3):
    for attempt in range(attempts):
        try:
            response = client.chat.completions.create(model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Translate this text to French: '{text}'"}
            ])
            return response.choices[0].message.content
        except Exception as e:
            print(f"Attempt {attempt+1} failed:", e)
            time.sleep(1)
    return "Sorry, I couldn't translate this text. Please try again later."