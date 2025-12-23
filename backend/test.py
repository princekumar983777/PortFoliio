import google.genai as genai
from google.genai.errors import ClientError

client = genai.Client()

def embed_with_quota_check(text):
    try:
        response = client.embed_content(
            model="models/embedding-001",
            content=text
        )
        print("Embedding successful:", response)
        return response

    except ClientError as e:
        error_message = str(e)
        if "RESOURCE_EXHAUSTED" in error_message or "429" in error_message:
            print("❌ Quota exhausted: You’ve hit the token/request limit.")
            # Here you can:
            # - Log the error
            # - Alert the user
            # - Switch to a backup model or service
            # - Stop further requests until quota resets
        else:
            print("⚠️ Other error occurred:", error_message)

def __init__(self):
    embed_with_quota_check("Initialize embedding client")