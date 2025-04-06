# National Industrial Classification (NIC) Code Semantic Search

This project provides a semantic search system for National Industrial Classification (NIC) codes, leveraging ModernBERT embeddings and Faiss for efficient similarity search. The backend is powered by FastAPI, offering a robust and fast API, while the frontend provides a user-friendly interface with both text and voice input capabilities.

## Features

* **ModernBERT-based Semantic Search:** Utilizes `nomic-ai/modernbert-embed-base` for generating high-quality embeddings, enabling accurate semantic search.
* **Efficient Faiss Indexing:** Employs Faiss for rapid similarity search, ensuring quick retrieval of relevant NIC codes.
* **FastAPI Backend:** A lightweight and high-performance API built with FastAPI, designed for efficient handling of search queries.
* **User-Friendly Frontend:** A simple and intuitive webpage with support for both text and voice input, enhancing user experience.

## Prerequisites

Before setting up the project, ensure you have the following installed:

* **Python 3.8+**
* **pip** (Python package manager)
* **Git** (for cloning the repository)
* **Node.js** (optional, for frontend modifications)

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git)
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Install Backend Dependencies:**

    * Create a virtual environment (recommended):

        ```bash
        python -m venv venv
        source venv/bin/activate  # On macOS/Linux
        venv\Scripts\activate  # On Windows
        ```

    * Install the required Python packages:

        ```bash
        pip install -r requirements.txt
        ```

3.  **Place Data Files:**

    * Ensure that `modernbert_faiss_index.bin` and `combined.csv` are located in the same directory as `app.py`.

## Running the Backend (FastAPI)

1.  Start the FastAPI server:

    ```bash
    uvicorn app:app --host 0.0.0.0 --port 9040
    ```

    * The API will be accessible at: `http://127.0.0.1:9040`
    * Swagger UI documentation: `http://127.0.0.1:9040/docs`

## Running the Frontend

1.  Open `index.html` in your web browser.

    * The frontend will interact with the backend API to perform search queries.

## API Endpoints

### 1. Search Endpoint

* **URL:** `/search`
* **Method:** `POST`
* **Request Format (JSON):**

    ```json
    {
      "query": "Your search term",
      "k": 5
    }
    ```

* **Response Example:**

    ```json
    {
      "query": "Your search term",
      "translated_query": "Translated text",
      "results": [
        {
          "S.No.": 1,
          "Description": "Industry description",
          "Class": "123",
          "Group": "456",
          "Sub Class": "789"
        },
        // ... more results
      ]
    }
    ```

### 2. Root Endpoint

* **URL:** `/`
* **Method:** `GET`
* **Response:**

    ```json
    {
      "message": "Welcome to the Semantic Search API!"
    }
    ```

## Troubleshooting

* **Faiss Index Not Found:** Verify that `modernbert_faiss_index.bin` exists in the correct directory.
* **CORS Issues:** Ensure that the API allows requests from your frontend's origin.
* **Missing Dependencies:** Re-run `pip install -r requirements.txt`.
* **Port Conflicts:** Change the port in `uvicorn app:app --port 9040` to an available port.

## Contributing

Contributions are welcome! Feel free to fork the repository, submit issues, or open pull requests.

## License

This project is licensed under the MIT License.
