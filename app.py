import google.generativeai as genai
import docx2txt
import streamlit as st

# Configure API Key
genai.configure(api_key="AIzaSyCJzwHnFVYGiP58TCLPJ92biDb63OudFaw")

# Function to load transcript
def load_transcript(file_path):
    if file_path.name.endswith(".docx"):
        return docx2txt.process(file_path)
    elif file_path.name.endswith(".txt"):
        return file_path.read().decode("utf-8")
    else:
        return "Unsupported file format. Please upload a .txt or .docx file."

# Function to summarize transcript using Gemini
def summarize_transcript(transcript):
    model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
    prompt = f"""
    Extract and summarize key points from the following meeting transcript.
    Structure the output in the format below:

    **Key Discussion Points:**
    1. [Summary point 1]
    2. [Summary point 2]

    **Decisions Made:**
    - [Decision 1]
    - [Decision 2]

    **Action Items:**
    - [Action Item 1]
    - [Action Item 2]

    Here is the transcript:
    {transcript}
    """
    response = model.generate_content(prompt)
    return response.text

# Streamlit UI
st.title("Meeting Transcript Summarizer")
uploaded_file = st.file_uploader("Upload a Transcript (.txt or .docx)", type=["txt", "docx"])

if uploaded_file:
    transcript = load_transcript(uploaded_file)
    if st.button("Summarize"):
        with st.spinner("Processing..."):
            summary = summarize_transcript(transcript)
        st.subheader("Generated Summary")
        st.write(summary)
