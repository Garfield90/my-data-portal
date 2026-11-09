# 작업 요약 보고서 (2026-11-04)

## 1. 작업 개요
- **작업 일자**: 2026년 11월 4일
- **이전 작업 요약**: [data-portal-work-summary-20261103.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/work-summary/data-portal-work-summary-20261103.md)
- **주요 목표**:
  1. 심층 질의응답(`/grill-me`)을 통한 **요구사항 정의서([01-requirements.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/01-requirements.md))** 작성
  2. 백엔드(헥사고날 + JPA/MyBatis 혼용) 및 프론트엔드 구조, 프로그램 소스 명명 규칙을 포함한 **아키텍처 설계서([02-architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/02-architecture.md))** 작성

---

## 2. 대화 및 의사결정 과정 (사용자 제안 ↔ AI 제안 및 보완)

### 2.1 요구사항 관리 방식 결정 (GitHub Issue vs 프로젝트 마크다운 문서)
- **[사용자 질문]**: *"요구사항을 같이 정리해보자. 이걸 이슈로 등록하는 게 나을까? 아니면 프로젝트 문서로 정리하는 게 나을까?"*
- **[AI 제안]**: 전체 설계의 기준점(Single Source of Truth)이 되어야 하므로 프로젝트 내 [01-requirements.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/01-requirements.md) 문서로 먼저 작성하고, 사용자가 직접 마크다운을 수정·보완하더라도 AI가 즉시 읽고 반영할 수 있는 구조로 운영할 것을 제안하여 확정.

### 2.2 요구사항 정의서([01-requirements.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/01-requirements.md)) 심층 인터뷰 (`/grill-me`)
1. **사용자 역할 및 권한 체계 (4단계 역할 확정)**:
   - **[AI 초기 제안]**: 일반사용자 / 데이터 모델러(DA) / 포털 관리자 3단계 제안.
   - **[사용자 보완 제안]**: 현업 거버넌스 체계에 맞게 **`시스템관리자(ROLE_SYS_ADMIN)` / `전사DA(ROLE_ENT_DA)` / `개별시스템DA(ROLE_APP_DA)` / `일반사용자(ROLE_USER)` 4단계 역할**로 세분화 제안.
   - **[합의된 상세 권한]**:
     - `일반사용자` 및 `개별시스템DA` 모두 표준 단어·용어·코드 신청 가능, 최종 승인은 `전사DA`가 수행(표준 도메인은 `전사DA` 전담 관리).
     - `개별시스템DA`는 본인이 담당하는 **단위 시스템(Target System)**의 데이터 모델(ERD)과 DB 정합성을 책임짐.
     - 초기 MVP 단계에서는 로그인 화면 대신 상단 **역할 전환기(Role Switcher)** 드롭다운으로 4가지 역할을 즉시 오가며 테스트하기로 결정.
2. **데이터 표준 4대 체계 (단어 · 도메인 · 용어 · 코드)**:
   - **[합의 내용]**: 표준 용어는 반드시 **등록된 표준 단어들의 조합 + 마지막 분류어(형식단어)에 연결된 표준 도메인 선택**으로만 생성되는 **엄격한 표준 조합 규칙** 채택.
   - 표준 단어 사전에 **분류어(Class Word — 도메인 그룹 매핑)** 및 **유사어/금칙어(대체 표준어 안내)** 기능을 포함하기로 확정.
3. **데이터 설계안 (인터랙티브 웹 ERD 모델러)**:
   - **[사용자 질문]**: *"실제로 포털 내에서 ERD를 직접 그릴 수 있는 거야?"*
   - **[AI 제안 및 합의]**: `@xyflow/react`(React Flow) 캔버스와 하단 컬럼 그리드 편집기를 결합하여, 마우스로 테이블 노드를 배치하고 PK↔FK 관계선을 연결하며 논리(한글)/물리(영문) 뷰를 전환하는 **인터랙티브 웹 ERD 작성 도구**로 구현 확정.
   - **표준 준수 유연성**: 기존 DB 역공학(Import)이나 초안 작성을 위해 비표준 컬럼도 저장은 허용하되, 시각적 `[비표준]` 경고 배지와 표준 준수율(%)을 표시하고 즉시 표준 신청으로 연동.
4. **물리 DB 연동 및 설계↔물리 정합성(Gap) 검증**:
   - **[합의 내용]**: 1차 대상 DBMS는 **PostgreSQL**로 하되 추후 Oracle/MySQL 확장을 위해 **Strategy 패턴(`TargetDbCatalogCollector`)** 적용.
   - 테이블(`MATCHED`, `MISSING_IN_DB`, `EXTRA_IN_DB`, `MODIFIED`) 및 컬럼(`MISSING_COLUMN`, `EXTRA_COLUMN`, `TYPE_MISMATCH`, `NULLABLE_MISMATCH`, `KEY_MISMATCH`, `COMMENT_MISMATCH`) 수준 정밀 비교.
   - 불일치 해결을 위해 **보정 DDL(`CREATE`/`ALTER`) 자동 생성**과 **물리 DB → 웹 ERD 역반영(Sync)** 양방향 조치를 제공하되, 운영 DB 안전을 위해 포털이 직접 DDL을 실행하지는 않기로 결정.

---

### 2.3 아키텍처 설계서([02-architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/02-architecture.md)) 및 소스 명명 규칙 수립
1. **백엔드 패키지 구조 (실용적 도메인별 헥사고날)**:
   - **[사용자 질문]**: 도메인별로 패키지를 나누면서 그 안을 헥사고날로 구성할 수 있는지 확인.
   - **[AI 제안 및 확정]**: 최상위는 업무 도메인별로 나누고, 각 도메인 내부를 `domain` / `application(port.in, port.out, service)` / `adapter(in.web, out.persistence)`로 구성하는 **Pragmatic Domain-Modular Hexagonal Architecture** 채택.
2. **JPA ↔ MyBatis 역할 분담 및 보안/공통 응답 규격**:
   - **JPA**: 엔티티 정의, 등록/수정/삭제(CUD), PK 단건 조회 담당.
   - **MyBatis**: 다중 조건 동적 검색·페이징, 설계↔물리 Gap 비교, 대시보드 통계 쿼리 담당.
   - 대상 물리 DB 비밀번호는 **AES-256 양방향 암호화**(`PORTAL_ENCRYPTION_KEY`) 저장, 모든 REST API는 `ApiResponse<T> { success, data, error }` 래퍼 및 `X-Portal-Role` 헤더 사용.
3. **프로그램 소스 명명 규칙 (사용자 제안 반영)**:
   - **[사용자 제안 1]**: *"프로그램 소스, Java class명, method명, 변수명 등에 대한 명명규칙과 React 소스에 대한 명명규칙을 아키텍처 문서에 작성했으면 해."*
   - **[사용자 제안 2]**: *"Backend에서 Domain, Entity에도 접미사(`*Domain`, `*Entity`)가 붙었으면 좋겠어. 그리고 포털 자체 DB의 테이블 명명규칙은 나중에 테이블 설계 시(`04-database-erd.md`)에 따로 넣고 싶어."*
   - **[반영 완료]**: 백엔드 모든 계층 클래스 접미사(`*Entity`, `*Domain`, `*UseCase`, `*Service`, `*LoadPort`, `*SavePort`, `*Controller`, `*Request`/`*Response`, `*PersistenceAdapter`, `*JpaRepository`, `*QueryMapper`)와 프론트엔드 파일/컴포넌트/핸들러(`handle*` vs `on*`) 명명 규칙을 [02-architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/02-architecture.md) 및 [.agents/rules/architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/.agents/rules/architecture.md)에 명문화.

---

## 3. 프로젝트 반영 산출물
1. [docs/01-requirements.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/01-requirements.md): 시스템 비전 및 기능 요구사항 정의서 초안 완성
2. [docs/02-architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/docs/02-architecture.md): 시스템·패키지 아키텍처 및 Java/React 명명 규칙 설계서 완성
3. [.agents/rules/architecture.md](file:///Users/garfield/intellij-projects/my-data-portal/.agents/rules/architecture.md): 도메인별 헥사고날 구조 및 클래스/컴포넌트 명명 규칙 동기화
