"""One-off: generate six realistic professional headshots for the Leadership board page."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT_DIR = Path("/app/frontend/src/assets/leaders")
OUT_DIR.mkdir(parents=True, exist_ok=True)

MODEL = "gemini-3-pro-image-preview"

PEOPLE = [
    ("alexandru-stefan-gheban", "head-and-shoulders studio portrait photograph of a friendly 32-year-old Eastern European man with short dark hair and a subtle smile, wearing a casual white v-neck t-shirt, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
    ("andrea-ferrero", "head-and-shoulders studio portrait photograph of a confident 34-year-old Italian man with light brown tousled hair and light stubble, wearing a plain black crew-neck t-shirt, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
    ("edoardo-guerrieri", "head-and-shoulders studio portrait photograph of a cheerful 38-year-old Italian man with dark hair and a full dark beard, big warm smile, wearing a white open-collar dress shirt, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
    ("giorgio-medda", "head-and-shoulders studio portrait photograph of a composed 45-year-old Italian businessman with short dark hair, clean shaven, wearing a charcoal suit with white shirt and blue tie, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
    ("nicolas-bertrand", "head-and-shoulders studio portrait photograph of a distinguished 52-year-old French businessman with neat brown hair, clean shaven, wearing a dark navy suit with light patterned tie, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
    ("salvatore-sberna", "head-and-shoulders studio portrait photograph of a 36-year-old Italian man with wavy brown hair and a short groomed beard, slight smile, wearing a navy suit with white shirt and light blue tie, plain light grey studio background, soft professional lighting, realistic skin texture, sharp focus, square composition, no text, no watermark"),
]


async def gen(name: str, prompt: str):
    out = OUT_DIR / f"{name}.png"
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=f"leader-{name}",
                   system_message="You are a professional corporate portrait photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        out.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {out} ({out.stat().st_size} bytes)", flush=True)
    else:
        print(f"EMPTY {name}: {str(text)[:160]}", flush=True)


async def main():
    for name, prompt in PEOPLE:
        await gen(name, prompt)


asyncio.run(main())
