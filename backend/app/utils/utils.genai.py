from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

# print("User_API_Key:", client._api_key)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="what is the capital of Andaman and Nicobar Islands?"
)
print(response.text)