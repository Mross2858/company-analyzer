import logging
import json
import time
from typing import Any, Dict, Optional
from functools import wraps
from contextlib import contextmanager

class LLMLogger:
    def __init__(self, log_file: str = "llm_debug.log"):
        self.logger = logging.getLogger("llm_logger")
        self.logger.setLevel(logging.DEBUG)
        
        # File handler
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def log_llm_call(self, func_name: str, prompt: str, **kwargs):
        """Log LLM call details"""
        log_entry = {
            "timestamp": time.time(),
            "function": func_name,
            "prompt": prompt,
            "metadata": kwargs
        }
        self.logger.debug(f"LLM Call: {json.dumps(log_entry, indent=2)}")
        return log_entry

    def log_llm_response(self, call_id: Dict[str, Any], response: str, 
                        duration: float, tokens: Optional[Dict[str, int]] = None):
        """Log LLM response details"""
        log_entry = {
            **call_id,
            "response": response,
            "duration_ms": duration * 1000,
            "tokens": tokens or {}
        }
        self.logger.debug(f"LLM Response: {json.dumps(log_entry, indent=2)}")
        return log_entry

    @contextmanager
    def log_context(self, func_name: str, prompt: str, **kwargs):
        """Context manager for logging LLM interactions"""
        start_time = time.time()
        call_log = self.log_llm_call(func_name, prompt, **kwargs)
        
        try:
            yield call_log
        finally:
            duration = time.time() - start_time
            self.logger.debug(f"LLM Context End - Duration: {duration:.2f}s")

    def analyze_prompt(self, prompt: str) -> Dict[str, Any]:
        """Analyze prompt for potential issues and improvement suggestions"""
        analysis = {
            "length": len(prompt),
            "suggestions": [],
            "warnings": []
        }
        
        # Basic prompt analysis
        if len(prompt) > 1000:
            analysis["warnings"].append("Prompt may be too long")
        if len(prompt.split()) < 3:
            analysis["warnings"].append("Prompt may be too short")
        if "please" in prompt.lower():
            analysis["suggestions"].append("Consider removing pleasantries for more direct prompts")
            
        return analysis

def llm_logger_decorator(logger: LLMLogger):
    """Decorator for logging LLM function calls"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            prompt = kwargs.get("prompt", args[0] if args else "No prompt found")
            
            with logger.log_context(func.__name__, prompt, **kwargs) as call_log:
                start_time = time.time()
                result = await func(*args, **kwargs)
                duration = time.time() - start_time
                
                logger.log_llm_response(
                    call_log,
                    str(result),
                    duration,
                    getattr(result, "usage", None)
                )
                return result
        return wrapper
    return decorator