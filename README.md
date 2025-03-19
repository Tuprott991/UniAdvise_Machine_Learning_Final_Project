# University Advisory AI Project  

## Project Overview  
This project creates an AI-powered university advisory system for Vietnamese higher education institutions. It leverages web crawling technologies to collect comprehensive data from universities nationwide, processes this information, and offers personalized educational guidance through an interactive AI agent.  

## Core Technologies  

### Data Collection  
- **Crawl4AI**: Extracts data from various university websites across Vietnam  
- Deep crawling capabilities for targeted university sites (e.g., `hcmus.edu.vn`)  
- Markdown processing for structured data preparation  

### Backend (Python - FastAPI)  
- **Database**: PostgreSQL hosted on cloud platforms (Azure/AWS)  
- **AI Components**:  
  - Gwen 2 8B model fine-tuned with QLora  
  - vLLM deployment on GPU server  
  - RAG implementation (custom or lightRAG)  
  - LangChain for agent construction  
  - Crawl4AI integration with Serper for data discovery and extraction  

### Frontend (TypeScript)  
- **React** as the main framework  
- **ChakraUI** for component styling  
- **Key Pages**:  
  - Homepage  
  - Hotline contact  
  - University tags/categories (HCMC focus)  
  - About us  
  - Chatbot interface  

## Team Structure  

### Backend Team  
- Database architecture and management  
- LangChain agent development  
- RAG system implementation  
- Web crawling and data processing  

### Frontend Team  
- Core UI framework development  
- Page implementation and user experience design  
- Chatbot interface integration  

## Features  
The AI agent functions as a university tour guide, capable of:  
- Recommending suitable universities and majors  
- Providing recent admission scores  
- Assessing student capabilities against program requirements  
- Answering detailed questions about specific institutions  

## Deployment  
The system uses GPU-accelerated servers for model hosting with vLLM for efficient inference and API access via FastAPI endpoints.  
