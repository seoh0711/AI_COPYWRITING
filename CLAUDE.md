# COPYWRITING MADE System

## 프로젝트 개요

COPYWRITING MADE System은 사용자가 콘텐츠 데이터를 업로드하면 AI가 분석하여 전문적인 카피를 생성하는 시스템입니다.

## 핵심 원칙

이 프로젝트의 모든 카피라이팅은 **3단계 프로세스**를 따릅니다:

### 1단계: Get Their Attention with Emotion (감정으로 주목시켜라)
- **Curiosity** (호기심): 독자가 더 알고 싶게 만들어라
- **Intrigue** (흥미): 예상치 못한 관점을 제시하라
- **Excitement** (흥분): 가능성에 대한 에너지를 만들어라

### 2단계: Keep Their Attention with Logic (논리로 주목을 유지하라)
- **Data** (데이터): 구체적인 숫자와 사실을 제시하라
- **Arguments** (논거): 왜 이것이 중요한지 논리적으로 설명하라
- **Statistics** (통계): 신뢰할 수 있는 수치로 뒷받침하라

### 3단계: Make Them Take Action with Authority (권위로 행동하게 만들어라)
- **Testimonials** (추천사): 실제 사용자의 목소리를 전달하라
- **Case Studies** (사례 연구): 성공 사례를 구체적으로 보여줘라
- **Guarantees** (보증): 리스크를 제거하고 확신을 줘라

## 7가지 카피라이팅 프레임워크

> 출처: Chase Dimond

### FAB (Features → Advantages → Benefits)
| 단계 | 설명 |
|------|------|
| **Features** | 제품이 할 수 있는 것부터 시작하라 |
| **Advantages** | 왜 도움이 되는지 설명하라 |
| **Benefits** | 독자에게 어떤 의미인지 상세히 설명하라 |

### BAB (Before → After → Bridge)
| 단계 | 설명 |
|------|------|
| **Before** | 문제가 있는 현재 상황을 제시하라 |
| **After** | 제품 없이도 가능한 세상을 보여줘라 |
| **Bridge** | 그곳에 도달하는 방법을 보여줘라 |

### PASTOR
| 단계 | 설명 |
|------|------|
| **Problem** | 사람들이 겪고 있는 문제를 파악하라 |
| **Amplify** | 해결하지 않을 경우의 결과를 증폭하라 |
| **Story** | 문제와 관련된 이야기를 들려줘라 |
| **Testimonials** | 만족한 고객의 추천사를 포함하라 |
| **Offer** | 제안을 제시하라 |
| **Response** | 반응을 요청하라 |

### AIDA
| 단계 | 설명 |
|------|------|
| **Attention** | 강렬한 문장으로 독자의 주의를 끌어라 |
| **Interest** | 독자의 흥미를 끄는 정보를 제시하라 |
| **Desire** | 제품의 이점을 설명하라 |
| **Action** | 가입/구매를 요청하라 |

### PAS (Problem → Agitate → Solution)
| 단계 | 설명 |
|------|------|
| **Problem** | 타겟의 가장 고통스러운 문제를 파악하라 |
| **Agitate** | 문제를 더 아프게 만들고, 왜 나쁜지 보여줘라 |
| **Solution** | 제품을 문제의 논리적 해결책으로 제시하라 |

### 3S (Star → Story → Solution)
| 단계 | 설명 |
|------|------|
| **Star** | 이야기의 주인공을 소개하라 |
| **Story** | 독자를 사로잡는 compelling한 이야기를 들려줘라 |
| **Solution** | 주인공이 어떻게 이기는지 설명하라 |

### The Four C's (4C 체크리스트)
> 프레임워크가 아닌 **좋은 카피를 쓰기 위한 체크리스트**

| C | 의미 |
|---|------|
| **Clear** | 명확하게 |
| **Concise** | 간결하게 |
| **Compelling** | 설득력 있게 |
| **Credible** | 신뢰할 수 있게 |

## 작업 규칙

### 코드 스타일
- Python 3.10+ 사용
- 타입 힌트 필수
- docstring은 한글로 작성
- 함수명/변수명은 snake_case

### 카피 생성 규칙
- 프레임워크 선택 시 타겟 오디언스를 먼저 분석할 것
- 모든 카피는 3단계 프로세스를 반드시 거칠 것
- 데이터 기반 인사이트를 항상 포함할 것
- 출력 형식: Markdown 또는 JSON

### 파일 구조 규칙
- `manuscript/` 폴더에 챕터별 콘텐츠 저장
- `resources/code-examples/` 에 코드 예제 저장
- `resources/references/` 에 참고 자료 저장
- 모든 이미지는 `resources/images/` 에 저장

### 커밋 메시지 규칙
- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- refactor: 코드 리팩토링
- style: 코드 포맷팅

## 사용 가능한 커맨드

- `/export` - 카피를 다양한 형식으로 내보내기
- `/review` - 작성된 카피를 검토하기
- `/technical-reviewer` - 기술적 정확성 검토 에이전트
- `/editor` - 편집 및 교정 에이전트

## 사용 가능한 스킬

- `chapter-structure` - 챕터 구조 설계
- `technical-writing` - 기술 문서 작성
- `code-example` - 코드 예제 생성
- `review-checklist` - 리뷰 체크리스트 관리
