"""
COPYWRITING MADE System - 헬퍼 유틸리티 모듈

카피라이팅 시스템 전반에서 사용되는 공통 유틸리티 함수들을 제공합니다.
"""

import json
import os
import re
from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field, asdict


# ─── 열거형 정의 ────────────────────────────────────────────

class Framework(Enum):
    """카피라이팅 프레임워크"""
    PAS = "PAS"
    BAB = "BAB"
    FAB = "FAB"


class ProcessStep(Enum):
    """3단계 프로세스"""
    EMOTION = "emotion"       # 감정으로 주목시키기
    LOGIC = "logic"           # 논리로 주목 유지하기
    AUTHORITY = "authority"   # 권위로 행동 유도하기


class CopyStatus(Enum):
    """카피 상태"""
    DRAFT = "draft"
    REVIEW = "review"
    REVISED = "revised"
    FINAL = "final"
    PUBLISHED = "published"


# ─── 데이터 모델 ────────────────────────────────────────────

@dataclass
class ContentData:
    """업로드된 콘텐츠 데이터 모델"""
    raw_text: str
    source: str
    data_type: str
    metadata: Dict[str, str] = field(default_factory=dict)
    uploaded_at: str = field(default_factory=lambda: datetime.now().isoformat())


@dataclass
class CopySection:
    """카피 섹션 모델"""
    title: str
    body: str
    framework_step: str
    process_step: ProcessStep
    word_count: int = 0

    def __post_init__(self):
        self.word_count = len(self.body.split())


@dataclass
class CopyResult:
    """생성된 카피 결과 모델"""
    framework: Framework
    sections: List[CopySection]
    target_audience: str
    tone: str
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())
    status: CopyStatus = CopyStatus.DRAFT

    def to_dict(self) -> Dict[str, Any]:
        """딕셔너리로 변환한다"""
        return asdict(self)

    def total_word_count(self) -> int:
        """전체 단어 수를 반환한다"""
        return sum(s.word_count for s in self.sections)


@dataclass
class ReviewResult:
    """리뷰 결과 모델"""
    review_id: str
    chapter: str
    framework: Framework
    overall_score: int
    scores: Dict[str, int]
    passed_items: int
    failed_items: int
    improvements: List[Dict[str, str]]
    reviewed_at: str = field(default_factory=lambda: datetime.now().isoformat())


# ─── 프레임워크 유틸리티 ─────────────────────────────────────

FRAMEWORK_STEPS = {
    Framework.PAS: {
        "steps": ["Problem", "Agitate", "Solve"],
        "descriptions": {
            "Problem": "타겟의 가장 고통스러운 문제를 파악하라",
            "Agitate": "문제를 더 아프게 만들고, 왜 나쁜지 보여줘라",
            "Solve": "제품을 문제의 논리적 해결책으로 제시하라",
        }
    },
    Framework.BAB: {
        "steps": ["Before", "After", "Bridge"],
        "descriptions": {
            "Before": "문제가 있는 현재 상황을 제시하라",
            "After": "제품 없이 사는 세상을 보여줘라",
            "Bridge": "거기에 도달하는 방법을 보여줘라",
        }
    },
    Framework.FAB: {
        "steps": ["Features", "Advantages", "Benefits"],
        "descriptions": {
            "Features": "제품이 할 수 있는 것부터 시작하라",
            "Advantages": "왜 도움이 되는지 설명하라",
            "Benefits": "독자에게 어떤 의미인지 상세히 설명하라",
        }
    },
}

THREE_STEP_PROCESS = {
    ProcessStep.EMOTION: {
        "name": "Get Their Attention with Emotion",
        "name_ko": "감정으로 주목시켜라",
        "elements": ["Curiosity (호기심)", "Intrigue (흥미)", "Excitement (흥분)"],
    },
    ProcessStep.LOGIC: {
        "name": "Keep Their Attention with Logic",
        "name_ko": "논리로 주목을 유지하라",
        "elements": ["Data (데이터)", "Arguments (논거)", "Statistics (통계)"],
    },
    ProcessStep.AUTHORITY: {
        "name": "Make Them Take Action with Authority",
        "name_ko": "권위로 행동하게 만들어라",
        "elements": ["Testimonials (추천사)", "Case Studies (사례 연구)", "Guarantees (보증)"],
    },
}


def get_framework_steps(framework: Framework) -> List[str]:
    """프레임워크의 단계 목록을 반환한다"""
    return FRAMEWORK_STEPS[framework]["steps"]


def get_framework_description(framework: Framework, step: str) -> str:
    """프레임워크 단계의 설명을 반환한다"""
    return FRAMEWORK_STEPS[framework]["descriptions"].get(step, "")


def get_process_elements(step: ProcessStep) -> List[str]:
    """3단계 프로세스의 요소 목록을 반환한다"""
    return THREE_STEP_PROCESS[step]["elements"]


# ─── 파일 유틸리티 ───────────────────────────────────────────

def load_json(filepath: str) -> Dict:
    """JSON 파일을 로드한다"""
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(data: Dict, filepath: str, indent: int = 2) -> None:
    """데이터를 JSON 파일로 저장한다"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=indent)


def save_markdown(content: str, filepath: str) -> None:
    """콘텐츠를 마크다운 파일로 저장한다"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)


def read_file(filepath: str) -> str:
    """파일을 읽어 문자열로 반환한다"""
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()


# ─── 텍스트 분석 유틸리티 ────────────────────────────────────

def count_words(text: str) -> int:
    """텍스트의 단어 수를 반환한다 (한글+영어 혼합 지원)"""
    korean = len(re.findall(r'[\uac00-\ud7af]+', text))
    english = len(re.findall(r'[a-zA-Z]+', text))
    return korean + english


def extract_numbers(text: str) -> List[str]:
    """텍스트에서 숫자/통계 데이터를 추출한다"""
    patterns = [
        r'\d+(?:,\d{3})*(?:\.\d+)?%',   # 퍼센트
        r'\d+(?:,\d{3})*(?:\.\d+)?배',   # ~배
        r'[₩$€¥]\s?\d+(?:,\d{3})*(?:\.\d+)?',  # 통화
        r'\d+(?:,\d{3})*(?:\.\d+)?',     # 일반 숫자
    ]
    results = []
    for pattern in patterns:
        results.extend(re.findall(pattern, text))
    return results


def estimate_reading_time(text: str, wpm: int = 200) -> int:
    """예상 읽기 시간을 분 단위로 반환한다"""
    words = count_words(text)
    return max(1, round(words / wpm))


# ─── 메타데이터 유틸리티 ─────────────────────────────────────

def generate_chapter_metadata(
    chapter_id: str,
    title: str,
    framework: Framework,
    process_step: ProcessStep,
    target_audience: str,
    key_message: str,
) -> Dict[str, Any]:
    """챕터 메타데이터를 생성한다"""
    return {
        "chapter_id": chapter_id,
        "title": title,
        "framework": framework.value,
        "process_step": process_step.value,
        "target_audience": target_audience,
        "key_message": key_message,
        "status": CopyStatus.DRAFT.value,
        "word_count": 0,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
    }


def generate_review_id() -> str:
    """고유 리뷰 ID를 생성한다"""
    now = datetime.now()
    return f"REV-{now.strftime('%Y%m%d')}-{now.strftime('%H%M%S')}"


# ─── 카피 포맷팅 유틸리티 ────────────────────────────────────

def format_copy_as_markdown(result: CopyResult) -> str:
    """카피 결과를 마크다운 형식으로 변환한다"""
    lines = [
        f"# {result.framework.value} 카피",
        f"",
        f"> 타겟: {result.target_audience} | 톤: {result.tone}",
        f"> 생성일: {result.created_at}",
        f"",
        "---",
        "",
    ]
    for section in result.sections:
        lines.append(f"## [{section.framework_step}] {section.title}")
        lines.append("")
        lines.append(section.body)
        lines.append("")
    return "\n".join(lines)


def format_copy_as_json(result: CopyResult) -> str:
    """카피 결과를 JSON 형식으로 변환한다"""
    return json.dumps(result.to_dict(), ensure_ascii=False, indent=2)
