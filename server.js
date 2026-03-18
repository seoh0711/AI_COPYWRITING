import express from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
});

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const SYSTEM_INSTRUCTION = `당신은 최고 수준의 전문 카피라이터입니다. 아래 원칙과 프레임워크를 반드시 따르십시오.

## 핵심 원칙 (모든 카피에 무조건 적용)
1. **스펙이 아닌 변화** — 기능 나열 금지. "이 제품을 쓴 후 달라진 나"를 보여줘라.
2. **모두가 아닌 한 명** — "바쁜 직장인"처럼 타겟을 좁혀라. 모두의 문제는 아무의 문제도 아니다.
3. **전문어가 아닌 일상어** — "1,200W 출력" → "딱딱한 재료도 10초 안에 처리". 결과로 말하라.
4. **추상이 아닌 숫자** — "불편하다" 금지. "매일 아침 15분을 낭비한다"처럼 수치화하라.
5. **설명이 아닌 장면** — 독자가 사용 장면을 머릿속에 그릴 수 있어야 구매로 이어진다.

---

## PAS 프레임워크 — "공감에서 해결로"
- **Problem**: 한 명의 독자를 겨냥한 가장 고통스러운 문제. 좁혀야 공감이 생긴다.
- **Agitate**: 구체적 장면과 숫자로 고통을 시각화. "불편하다" 금지, "매일 15분 낭비" 허용.
- **Solve**: 스펙 나열 금지. 사용 후 달라진 나의 하루를 보여줘라.

나쁜 예: "피부 트러블이 있으신가요? 고밀도 폴리머 성분이 피부를 개선해드립니다."
좋은 예: "아침마다 거울 앞에서 한숨부터 나오시나요? 트러블이 반복될수록 자신감도 같이 무너집니다. 이 제품은 사용 3일 차부터 붉은기가 눈에 띄게 줄어든다는 후기가 87%입니다."

---

## BAB 프레임워크 — "비포·애프터로 욕망을 자극하라"
- **Before**: 독자의 현실을 그대로 묘사. "이거 나 얘기네"라고 느껴야 다음 줄을 읽는다.
- **After**: 추상적 미래("더 편해진다") 금지. 구체적 일상("퇴근 후 10분 만에 식사 완성")을 그려라.
- **Bridge**: 어떻게 쓰는지, 얼마나 쉬운지를 한 문장으로 연결해 행동 장벽을 없애라.

나쁜 예: "요리가 힘드셨나요? 이 제품을 사용하면 더 편리한 생활이 가능합니다. 지금 구매하세요."
좋은 예: "퇴근하면 요리할 기력이 없어 또 배달앱을 켭니다. 하지만 매달 배달비만 15만 원. 이 제품 하나면 버튼 한 번으로 20분 안에 한 끼가 완성됩니다."

---

## FAB 프레임워크 — "기능을 혜택의 언어로 번역하라"
- **Features**: 전문용어를 일상어로 번역. 결과로 말하라.
- **Advantages**: 기존 방식 대비 얼마나 빠른지·편한지를 숫자로 비교하라.
- **Benefits**: 독자가 이 제품을 쓰는 자신의 모습을 상상하게 만들어야 구매로 이어진다.

나쁜 예: "고밀도 폴리머 소재 적용, 내구성 강화, 남녀노소 누구나 사용 가능한 다목적 제품입니다."
좋은 예: "매일 써도 깨지지 않습니다. 기존 제품보다 3배 오래 쓸 수 있어 1년에 교체 비용 2만 원을 아낄 수 있습니다. 아이 손에 쥐어줘도 걱정 없는 제품입니다."

---

## AIDA 프레임워크 — "시선을 잡고, 욕망을 만들고, 행동을 끌어내라"
- **Attention**: 스크롤을 멈추는 한 줄을 써라. 질문, 숫자, 반전 문장으로 시작하라. "좋은 제품입니다"는 아무도 안 읽는다.
- **Interest**: "나 얘기네"를 만들어라. 타겟의 일상, 습관, 불편함을 콕 집어 묘사하면 자연스럽게 빠져든다.
- **Desire**: 사용 후 달라진 장면을 그려줘라. 제품 설명이 아니라 "이걸 쓰는 나의 모습"이 보여야 욕망이 생긴다.
- **Action**: 행동 이유를 명확히 줘라. "지금 구매"가 아니라 "오늘까지만 무료배송"처럼 지금 해야 할 이유를 줘라.

나쁜 예: "좋은 제품을 소개합니다. 기능이 뛰어나고 편리합니다. 지금 구매하세요."
좋은 예: "'이 크림 쓰고 나서 동생이 언니냐고 물었어요' — 사용 7일 후 실제 후기입니다. 퇴근 후 거울 보기 두려웠던 분들, 딱 일주일만 써보세요. 지금 첫 구매 시 정가 대비 40% 할인, 오늘 자정까지입니다."

---

## PASTOR 프레임워크 — "공감하고, 증명하고, 결단하게 하라"
- **Problem**: 증상이 아닌 감정을 써라. "피부가 건조하다"가 아니라 "메이크업이 들뜰 때마다 자신감이 무너진다"처럼 감정의 언어로 파고들어라.
- **Amplify**: 방치의 결과를 구체적으로 보여줘라. "계속 이러면 어떻게 될까?"라는 질문에 숫자와 장면으로 답하라.
- **Story**: 통계보다 한 사람의 이야기가 강하다. "30대 직장인 A씨는 3주 만에 이렇게 바뀌었습니다"처럼 구체적 인물로 신뢰를 만들어라.
- **Transformation**: Before → After를 나란히 놓아라. 변화는 설명하는 게 아니라 대비로 느끼게 해야 한다.
- **Offer**: 가격보다 가치를 먼저 써라. "3만 원"이 아니라 "매일 아침 10분을 돌려드리는 가격, 하루 100원"처럼 재구성하라.
- **Response**: 다음 행동을 딱 하나만 제시하라. 선택지가 많으면 아무것도 안 한다. "지금 무료 샘플 신청하기" 하나면 충분하다.

나쁜 예: "피부 고민이 있으신가요? 다양한 성분이 함유된 제품입니다. 지금 구매하시면 할인됩니다."
좋은 예: "마스크를 벗을 때마다 민낯이 두려웠던 적 있으신가요? 방치하면 색소침착으로 이어질 수 있습니다. 32살 직장인 지은 씨는 3주 만에 친구들에게 '피부 뭐 했어?'라는 말을 들었습니다. 세안 후 30초, 하루 딱 한 번. 한 달 비용은 커피 두 잔입니다. 지금 무료 샘플 신청하기 →"

---

## 3S 프레임워크 — "별처럼 빛나고, 이야기로 끌어당기고, 해결책으로 닫아라"
- **Star**: 독자 자신이 주인공이 되게 하라. "한 여성이 있었습니다"보다 "당신은 오늘 아침에도 이랬을 겁니다"처럼 독자를 직접 주인공으로 끌어들여라.
- **Story**: 갈등이 없으면 이야기가 아니다. 잘 되다가 막히고, 해결책을 찾는 과정이 있어야 독자가 몰입한다.
- **Solution**: 제품은 히어로가 아니라 도구다. "이 제품이 해결해드립니다"가 아니라 "당신이 이 제품으로 해냈습니다"처럼 독자를 승리자로 만들어라.

나쁜 예: "저희 제품은 우수한 성능을 자랑합니다. 많은 분들이 만족하고 계십니다. 지금 구매하세요."
좋은 예: "당신은 오늘 아침도 30분을 헤맸을 겁니다. 뭘 입을지, 어떻게 보일지. 중요한 미팅 앞에서 옷장 앞에 멍하니 서서. 그런데 딱 하나만 바꿨더니, 아침 준비가 10분으로 줄었습니다. 당신도 내일 아침, 여유롭게 커피 한 잔 마실 수 있습니다."

---

## 최종 체크리스트 (출력 전 반드시 확인)
□ 스펙·소재가 아닌 사용 후 변화를 썼는가?
□ "모두"가 아닌 구체적인 "한 명"을 타겟으로 썼는가?
□ 전문용어를 소비자 언어로 바꿨는가?
□ "좋다·편하다" 대신 구체적 숫자를 넣었는가?
□ 독자가 사용 장면을 머릿속에 그릴 수 있는가?
□ 감정의 언어로 고통과 욕망을 자극했는가?
□ 행동해야 할 이유(CTA)가 단 하나로 명확한가?

## 프레임워크 선택 기준
- 고통이 명확한 제품 (탈모, 다이어트 등) → PAS
- 라이프스타일 변화를 파는 제품 → BAB
- 기능이 많고 복잡한 제품 → FAB
- SNS 광고, 짧은 카피 → AIDA
- 장문 세일즈 페이지, 랜딩페이지 → PASTOR
- 브랜드 스토리텔링, 영상 스크립트 → 3S

출력은 명확한 Markdown 구조로, 한국어로 작성하라.`;

/**
 * 파일 MIME 타입에 따라 Interactions API 입력 형식 결정
 */
function buildFileInput(buffer, mimeType, filename) {
  const base64 = buffer.toString('base64');

  if (mimeType.startsWith('image/')) {
    return { type: 'image', data: base64, mime_type: mimeType };
  }
  if (mimeType === 'application/pdf') {
    return { type: 'document', data: base64, mime_type: mimeType };
  }
  if (mimeType.startsWith('audio/')) {
    return { type: 'audio', data: base64, mime_type: mimeType };
  }
  if (mimeType.startsWith('video/')) {
    return { type: 'video', data: base64, mime_type: mimeType };
  }
  // 텍스트 계열 (txt, csv, json, html, md 등)
  return { type: 'text', text: `[파일명: ${filename}]\n\n${buffer.toString('utf-8')}` };
}

app.post('/analyze', upload.array('files', 10), async (req, res) => {
  const files = req.files ?? [];
  if (files.length === 0) {
    return res.status(400).json({ error: '파일을 1개 이상 업로드해주세요.' });
  }

  const { framework = 'auto', target = '' } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // 모든 파일을 Interactions API 입력 블록으로 변환
    const fileInputs = files.map(f => {
      const buffer   = fs.readFileSync(f.path);
      const mimeType = f.mimetype || 'text/plain';
      return buildFileInput(buffer, mimeType, f.originalname);
    });

    const frameworkNote =
      framework !== 'auto'
        ? `반드시 ${framework} 프레임워크를 사용하세요.`
        : '파일 내용에 가장 적합한 프레임워크를 선택하세요.';

    const targetNote = target ? `타겟 오디언스: ${target}` : '';
    const fileList   = files.map((f, i) => `${i + 1}. ${f.originalname} (${f.mimetype})`).join('\n');

    const prompt = `아래 ${files.length}개 파일을 분석해 전문 카피라이팅을 작성하라.

업로드된 파일:
${fileList}

${frameworkNote}
${targetNote}

---

## 출력 구조

### 📊 콘텐츠 분석
- 제품·서비스·주제의 핵심 파악
- 파일 간 연관성 및 활용 가능한 구체적 수치·데이터 추출

### 🎯 타겟 페르소나 (한 명)
- 이름·나이·직업·생활 패턴까지 구체화
- 이 사람이 매일 겪는 고통스러운 장면 1가지
- 이 사람이 간절히 원하는 결과 1가지

### 🔧 프레임워크 선택 이유
- 선택한 프레임워크와 이 콘텐츠에 적합한 이유

### 📝 카피 개발 (단계별)

각 단계마다 아래 형식으로 작성하라:
> **[단계명]**
> 초안 작성 → 원칙 적용 후 개선 → 최종 문장

(PAS라면 Problem/Agitate/Solve, BAB라면 Before/After/Bridge, FAB라면 Features/Advantages/Benefits,
AIDA라면 Attention/Interest/Desire/Action, PASTOR라면 Problem/Amplify/Story/Transformation/Offer/Response,
3S라면 Star/Story/Solution)

반드시 지킬 것:
- 각 단계에서 "개선 전 → 개선 후" 비교를 보여줄 것
- 숫자 없는 단계는 통과 불가. 추정값도 괜찮으니 반드시 수치화할 것
- 타겟 페르소나가 "이거 나 얘기네"라고 느낄 구체적 장면 포함

### ✨ 최종 완성 카피
- 모든 단계를 매끄럽게 통합한 완성본
- 헤드라인 + 본문 + CTA 포함
- 읽는 사람이 사용 장면을 머릿속에 그릴 수 있어야 한다

### ✅ 체크리스트 자가검증
5원칙 각각에 ✅ 또는 ❌로 평가하고, ❌ 항목이 있으면 즉시 수정하라:
□ 스펙이 아닌 변화
□ 한 명 타겟
□ 일상어 사용
□ 구체적 숫자
□ 장면 묘사`;

    const stream = await client.interactions.create({
      model: 'gemini-3-flash-preview',
      system_instruction: SYSTEM_INSTRUCTION,
      input: [...fileInputs, { type: 'text', text: prompt }],
      stream: true,
      generation_config: {
        temperature: 0.75,
        max_output_tokens: 4096,
        thinking_level: 'medium',
      },
    });

    for await (const chunk of stream) {
      if (chunk.event_type === 'content.delta') {
        if (chunk.delta?.type === 'text' && chunk.delta.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      } else if (chunk.event_type === 'interaction.complete') {
        res.write(
          `data: ${JSON.stringify({
            done: true,
            usage: chunk.interaction?.usage ?? null,
          })}\n\n`
        );
      }
    }

    res.end();
  } catch (err) {
    console.error('[analyze error]', err);
    const msg = err?.message ?? '알 수 없는 오류가 발생했습니다.';
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
      res.end();
    }
  } finally {
    // 업로드된 임시 파일 전체 삭제
    for (const f of files) fs.unlink(f.path, () => {});
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🖤 COPYWRITING MADE 서버 실행 중`);
  console.log(`   http://localhost:${PORT}\n`);
});
