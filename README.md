# My Data Portal

데이터 표준 관리, 인터랙티브 웹 ERD 모델링, 그리고 설계↔물리 DB 정합성(Gap) 검증을 제공하는 데이터 거버넌스 포털 프로젝트입니다.

## 기술 스택

| 영역 | 기술 스택 |
| --- | --- |
| **Frontend (`frontend/`)** | React, TypeScript, Vite, PrimeReact v10 (`primereact`, `primeicons`, `primeflex`), React Flow |
| **Online Backend (`backend/`)** | Java 21 (LTS), Spring Boot 3.4, Gradle (Groovy DSL), Spring Data JPA, MyBatis, Spring Data Redis |
| **Batch (`batch/`)** | Java 21 (LTS), Spring Boot 3.4, **Spring Batch**, Spring Data JPA, MyBatis |
| **Database & Cache** | PostgreSQL 16 (`mydataportal`), Redis 7 (Docker Compose) |

## 디렉토리 구조

```text
my-data-portal/
├── docker-compose.yml   # 로컬 개발용 PostgreSQL 16 + Redis 7 컨테이너 설정
├── docs/                # 요구사항(01), 아키텍처(02), UI설계(03), DB설계(04) 문서
├── frontend/            # React + TypeScript + PrimeReact 프론트엔드 (Port: 5173)
├── backend/             # 온라인 실시간 API 전용 Spring Boot 서버 (Port: 8080)
└── batch/               # 단위 시스템 물리 DB 카탈로그 일배치 수집 전용 Spring Batch 앱
```

## 로컬 실행 방법

### 1. 데이터베이스(PostgreSQL) 및 인메모리 캐시(Redis) 실행
```bash
docker compose up -d
```

### 2. 온라인 백엔드(`backend/`) 실행
```bash
cd backend
./gradlew bootRun
```
- 기본 포트: `http://localhost:8080`
- 헬스체크 API: `GET http://localhost:8080/api/health`

### 3. 배치 애플리케이션(`batch/`) 실행
```bash
cd batch
./gradlew bootRun
```

### 4. 프론트엔드(`frontend/`) 실행
```bash
cd frontend
npm install
npm run dev
```
- 기본 포트: `http://localhost:5173` (`/api` 요청은 `http://localhost:8080`으로 프록시 연동)
