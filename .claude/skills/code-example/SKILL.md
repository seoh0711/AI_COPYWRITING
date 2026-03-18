# Skill: Code Example (코드 예제 생성)

## 목적
카피라이팅 시스템의 각 기능을 보여주는 실행 가능한 코드 예제를 생성합니다.

## 트리거 조건
- 카피라이팅 프로세스의 코드 구현이 필요할 때
- API 사용 예제가 필요할 때
- "코드", "예제", "구현", "스크립트" 키워드 포함 시

## 실행 절차

### Step 1: 코드 예제 구조 정의
모든 코드 예제는 다음 구조를 따른다:

```python
"""
예제 제목: [제목]
프레임워크: [PAS|BAB|FAB]
프로세스 단계: [Emotion|Logic|Authority]
설명: [이 예제가 보여주는 것]
"""

# --- 설정 ---
# 필요한 import와 초기 설정

# --- 입력 데이터 ---
# 분석할 콘텐츠 데이터 정의

# --- 처리 ---
# 카피라이팅 로직 실행

# --- 출력 ---
# 생성된 카피 출력 및 저장
```

### Step 2: 핵심 코드 패턴

#### 데이터 분석 패턴
```python
from typing import Dict, List
from dataclasses import dataclass

@dataclass
class ContentData:
    """업로드된 콘텐츠 데이터 모델"""
    raw_text: str
    source: str
    data_type: str  # "quantitative" | "qualitative" | "technical"
    metadata: Dict[str, str]

def analyze_content(data: ContentData) -> Dict[str, any]:
    """콘텐츠 데이터를 분석하여 카피라이팅 인사이트를 추출한다"""
    return {
        "pain_points": [],      # 고통점 목록
        "key_numbers": [],      # 핵심 수치
        "testimonials": [],     # 추천사/리뷰
        "unique_selling_points": []  # 차별점
    }
```

#### 프레임워크 적용 패턴
```python
from enum import Enum

class Framework(Enum):
    PAS = "PAS"
    BAB = "BAB"
    FAB = "FAB"

class ProcessStep(Enum):
    EMOTION = "emotion"
    LOGIC = "logic"
    AUTHORITY = "authority"

def generate_copy(
    insights: Dict,
    framework: Framework,
    target_audience: str,
    tone: str = "professional"
) -> Dict[str, str]:
    """인사이트를 기반으로 프레임워크에 따른 카피를 생성한다"""
    copy_sections = {}

    if framework == Framework.PAS:
        copy_sections["problem"] = _generate_problem(insights, target_audience)
        copy_sections["agitate"] = _generate_agitate(insights)
        copy_sections["solve"] = _generate_solve(insights)
    elif framework == Framework.BAB:
        copy_sections["before"] = _generate_before(insights, target_audience)
        copy_sections["after"] = _generate_after(insights)
        copy_sections["bridge"] = _generate_bridge(insights)
    elif framework == Framework.FAB:
        copy_sections["features"] = _generate_features(insights)
        copy_sections["advantages"] = _generate_advantages(insights)
        copy_sections["benefits"] = _generate_benefits(insights, target_audience)

    return copy_sections
```

#### 3단계 프로세스 적용 패턴
```python
def apply_three_step_process(copy_sections: Dict[str, str]) -> Dict[str, str]:
    """생성된 카피에 3단계 프로세스를 적용한다"""
    enhanced = {}

    # 1단계: Emotion - 감정으로 주목시키기
    enhanced["hook"] = enhance_with_emotion(
        copy_sections,
        elements=["curiosity", "intrigue", "excitement"]
    )

    # 2단계: Logic - 논리로 주목 유지하기
    enhanced["body"] = enhance_with_logic(
        copy_sections,
        elements=["data", "arguments", "statistics"]
    )

    # 3단계: Authority - 권위로 행동 유도하기
    enhanced["cta"] = enhance_with_authority(
        copy_sections,
        elements=["testimonials", "case_studies", "guarantees"]
    )

    return enhanced
```

### Step 3: 예제 파일 네이밍 규칙
```
resources/code-examples/
├── 01-data-analysis-basic.py       # 기본 데이터 분석
├── 02-pas-framework.py             # PAS 프레임워크 예제
├── 03-bab-framework.py             # BAB 프레임워크 예제
├── 04-fab-framework.py             # FAB 프레임워크 예제
├── 05-three-step-process.py        # 3단계 프로세스 적용
├── 06-export-formats.py            # 다양한 출력 형식
└── utils/
    ├── content_parser.py           # 콘텐츠 파싱 유틸리티
    ├── copy_formatter.py           # 카피 포맷팅 유틸리티
    └── data_validator.py           # 데이터 검증 유틸리티
```

## 코드 품질 기준
- 모든 함수에 타입 힌트 포함
- docstring은 한글로 작성
- 실행 가능한 코드일 것 (syntax error 없음)
- 예제 데이터 포함 (빈 입력 불가)
- 에러 핸들링 포함
