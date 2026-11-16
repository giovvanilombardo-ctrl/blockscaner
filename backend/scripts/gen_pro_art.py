"""One-off: generate Pro page card art (trader photo + 3D membership medals)."""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT_DIR = Path("/app/frontend/src/assets/pro")
OUT_DIR.mkdir(parents=True, exist_ok=True)

MODEL = "gemini-3-pro-image-preview"

IMAGES = [
    ("trader-desk", "soft-focus photograph, heavily blurred bokeh: a man with a beard and glasses seen from behind/side, working at a desktop monitor in a bright modern office, large green plants around, bright natural daylight through big windows, light grey and green tones, shallow depth of field, dreamy out-of-focus background, photorealistic, landscape composition, no text, no watermark"),
    ("fee-medals", "3D render on a pure black background: one large glossy blue hexagonal badge with a lighter-blue check mark in the centre front, flanked by a gold hexagonal badge on the left and a silver hexagonal badge on the right, plus a small bronze hexagonal badge at the far right, each with a subtle check mark, arranged as overlapping membership tier medals at the bottom of the frame with dark empty space above, premium fintech style, soft studio lighting, vibrant blue gold and silver, no text, no watermark"),
    ("trading-terminal", "dark professional crypto trading terminal interface screenshot, full screen: candlestick chart with green and red candles, volume bars at bottom, order book panel on the right side, BTC-EUR price header at top, dark navy and black background, TradingView style, no text labels legible, landscape composition, photorealistic UI render"),
    ("api-nodes", "minimalist 3D render on a dark green gradient background: a single large dark circular node at the bottom centre, with exactly 6 clean glowing green lines fanning upward from it to 6 small simple glowing green node circles arranged in a gentle arc above, sparse clean network topology, premium fintech style, dark emerald and bright green, no text, landscape composition, minimal, uncluttered"),
]


async def gen(name: str, prompt: str):
    out = OUT_DIR / f"{name}.png"
    chat = LlmChat(api_key=os.environ["EMERGENT_LLM_KEY"], session_id=f"pro-{name}",
                   system_message="You are a professional commercial photographer and 3D artist.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        out.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"saved {out} ({out.stat().st_size} bytes)", flush=True)
    else:
        print(f"EMPTY {name}: {str(text)[:160]}", flush=True)


async def main():
    for name, prompt in IMAGES:
        await gen(name, prompt)


asyncio.run(main())
