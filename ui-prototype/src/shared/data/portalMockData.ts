export interface TermItem {
  id: number
  logicalName: string
  physicalName: string
  wordComposition: string
  domainName: string
  dataType: string
  status: 'APPROVED' | 'REQUESTED'
}

export interface WordItem {
  id: number
  logicalName: string
  abbr: string
  engFullName: string
  isClassWord: string
  domainGroup: string
  forbiddenSynonyms: string
  status: string
}

export interface DomainItem {
  id: number
  domainGroup: string
  domainName: string
  logicalType: string
  physicalType: string
  desc: string
}

export interface CodeGroup {
  codeId: string
  groupName: string
  domainName: string
  useYn: string
  items: { value: string; label: string; sortOrder: number; useYn: string }[]
}

export interface ErdColumn {
  seq: number
  logicalName: string
  physicalName: string
  dataType: string
  pk: boolean
  fk: boolean
  notNull: boolean
  standardCompliant: boolean
}

export interface ErdTable {
  id: string
  logicalName: string
  physicalName: string
  x: number
  y: number
  columns: ErdColumn[]
}

export interface GapTableItem {
  tableName: string
  logicalName: string
  status: 'MATCHED' | 'MODIFIED' | 'MISSING_IN_DB' | 'EXTRA_IN_DB'
  gapCount: number
  ddl: string
  columns: {
    columnName: string
    logicalName: string
    designSpec: string
    physicalSpec: string
    result: 'MATCHED' | 'TYPE_MISMATCH' | 'MISSING_COLUMN' | 'EXTRA_COLUMN'
  }[]
}

export const INITIAL_TERMS: TermItem[] = [
  { id: 1, logicalName: '고객번호', physicalName: 'CUST_NO', wordComposition: '고객(CUST) + 번호(NO)', domainName: '번호_V20', dataType: 'VARCHAR(20)', status: 'APPROVED' },
  { id: 2, logicalName: '고객명', physicalName: 'CUST_NM', wordComposition: '고객(CUST) + 명(NM)', domainName: '명칭_V100', dataType: 'VARCHAR(100)', status: 'APPROVED' },
  { id: 3, logicalName: '고객전화번호', physicalName: 'CUST_TEL_NO', wordComposition: '고객(CUST) + 전화(TEL) + 번호(NO)', domainName: '전화번호_V20', dataType: 'VARCHAR(20)', status: 'APPROVED' },
  { id: 4, logicalName: '주문번호', physicalName: 'ORD_NO', wordComposition: '주문(ORD) + 번호(NO)', domainName: '번호_V20', dataType: 'VARCHAR(20)', status: 'APPROVED' },
  { id: 5, logicalName: '주문일자', physicalName: 'ORD_DT', wordComposition: '주문(ORD) + 일자(DT)', domainName: '일자_C8', dataType: 'CHAR(8)', status: 'APPROVED' },
  { id: 6, logicalName: '결제금액', physicalName: 'PAY_AMT', wordComposition: '결제(PAY) + 금액(AMT)', domainName: '금액_N15', dataType: 'NUMERIC(15,0)', status: 'REQUESTED' },
]

export const SAMPLE_WORDS: WordItem[] = [
  { id: 1, logicalName: '고객', abbr: 'CUST', engFullName: 'Customer', isClassWord: 'N', domainGroup: '-', forbiddenSynonyms: '손님, 클라이언트', status: 'APPROVED' },
  { id: 2, logicalName: '번호', abbr: 'NO', engFullName: 'Number', isClassWord: 'Y', domainGroup: '번호', forbiddenSynonyms: '넘버', status: 'APPROVED' },
  { id: 3, logicalName: '일자', abbr: 'DT', engFullName: 'Date', isClassWord: 'Y', domainGroup: '날짜', forbiddenSynonyms: '날짜, 데이트', status: 'APPROVED' },
  { id: 4, logicalName: '금액', abbr: 'AMT', engFullName: 'Amount', isClassWord: 'Y', domainGroup: '금액', forbiddenSynonyms: '돈, 가액', status: 'APPROVED' },
]

export const SAMPLE_DOMAINS: DomainItem[] = [
  { id: 1, domainGroup: '번호', domainName: '번호_V20', logicalType: '문자(가변)', physicalType: 'VARCHAR(20)', desc: '일반 식별 번호 도메인' },
  { id: 2, domainGroup: '번호', domainName: '전화번호_V20', logicalType: '문자(가변)', physicalType: 'VARCHAR(20)', desc: '유선/휴대전화번호' },
  { id: 3, domainGroup: '날짜', domainName: '일자_C8', logicalType: '문자(고정)', physicalType: 'CHAR(8)', desc: 'YYYYMMDD 8자리 일자' },
  { id: 4, domainGroup: '금액', domainName: '금액_N15', logicalType: '숫자', physicalType: 'NUMERIC(15,0)', desc: '원화 금액 표준' },
]

export const SAMPLE_CODE_GROUPS: CodeGroup[] = [
  {
    codeId: 'PAY_MTHD_CD',
    groupName: '결제수단코드',
    domainName: '코드_V10',
    useYn: 'Y',
    items: [
      { value: 'CARD', label: '신용카드', sortOrder: 1, useYn: 'Y' },
      { value: 'BANK', label: '실시간 계좌이체', sortOrder: 2, useYn: 'Y' },
      { value: 'V_ACCT', label: '가상계좌 입금', sortOrder: 3, useYn: 'Y' },
      { value: 'POINT', label: '포인트 결제', sortOrder: 4, useYn: 'Y' },
    ],
  },
  {
    codeId: 'ORD_STAT_CD',
    groupName: '주문상태코드',
    domainName: '코드_V10',
    useYn: 'Y',
    items: [
      { value: '10', label: '주문접수', sortOrder: 1, useYn: 'Y' },
      { value: '20', label: '결제완료', sortOrder: 2, useYn: 'Y' },
      { value: '30', label: '배송중', sortOrder: 3, useYn: 'Y' },
      { value: '90', label: '주문취소', sortOrder: 4, useYn: 'Y' },
    ],
  },
  {
    codeId: 'CUST_GRD_CD',
    groupName: '고객등급코드',
    domainName: '코드_V10',
    useYn: 'Y',
    items: [
      { value: 'VIP', label: '우수고객(VIP)', sortOrder: 1, useYn: 'Y' },
      { value: 'GOLD', label: '골드등급', sortOrder: 2, useYn: 'Y' },
      { value: 'GEN', label: '일반등급', sortOrder: 3, useYn: 'Y' },
    ],
  },
]

export const SAMPLE_ERD_TABLES: ErdTable[] = [
  {
    id: 'TB_CUST',
    logicalName: '고객기본',
    physicalName: 'TB_CUST',
    x: 40,
    y: 35,
    columns: [
      { seq: 1, logicalName: '고객번호', physicalName: 'CUST_NO', dataType: 'VARCHAR(20)', pk: true, fk: false, notNull: true, standardCompliant: true },
      { seq: 2, logicalName: '고객명', physicalName: 'CUST_NM', dataType: 'VARCHAR(100)', pk: false, fk: false, notNull: true, standardCompliant: true },
      { seq: 3, logicalName: '고객전화번호', physicalName: 'CUST_TEL_NO', dataType: 'VARCHAR(20)', pk: false, fk: false, notNull: false, standardCompliant: true },
      { seq: 4, logicalName: '별명(비표준예시)', physicalName: 'NICK_NAME', dataType: 'VARCHAR(50)', pk: false, fk: false, notNull: false, standardCompliant: false },
    ],
  },
  {
    id: 'TB_ORDER',
    logicalName: '주문내역',
    physicalName: 'TB_ORDER',
    x: 430,
    y: 35,
    columns: [
      { seq: 1, logicalName: '주문번호', physicalName: 'ORD_NO', dataType: 'VARCHAR(20)', pk: true, fk: false, notNull: true, standardCompliant: true },
      { seq: 2, logicalName: '고객번호', physicalName: 'CUST_NO', dataType: 'VARCHAR(20)', pk: false, fk: true, notNull: true, standardCompliant: true },
      { seq: 3, logicalName: '주문일자', physicalName: 'ORD_DT', dataType: 'CHAR(8)', pk: false, fk: false, notNull: true, standardCompliant: true },
      { seq: 4, logicalName: '결제수단코드', physicalName: 'PAY_MTHD_CD', dataType: 'VARCHAR(10)', pk: false, fk: false, notNull: true, standardCompliant: true },
      { seq: 5, logicalName: '결제금액', physicalName: 'PAY_AMT', dataType: 'NUMERIC(15,0)', pk: false, fk: false, notNull: true, standardCompliant: true },
    ],
  },
]

export const SAMPLE_GAP_TABLES: GapTableItem[] = [
  {
    tableName: 'TB_CUST',
    logicalName: '고객기본',
    status: 'MODIFIED',
    gapCount: 2,
    ddl: `-- [TB_CUST] 설계 ↔ 물리 DB 불일치 보정 SQL\nALTER TABLE TB_CUST ALTER COLUMN CUST_NM TYPE VARCHAR(100);\nALTER TABLE TB_CUST ADD COLUMN NICK_NAME VARCHAR(50);\nCOMMENT ON COLUMN TB_CUST.NICK_NAME IS '별명(비표준예시)';`,
    columns: [
      { columnName: 'CUST_NO', logicalName: '고객번호', designSpec: 'VARCHAR(20) / PK / NOT NULL', physicalSpec: 'VARCHAR(20) / PK / NOT NULL', result: 'MATCHED' },
      { columnName: 'CUST_NM', logicalName: '고객명', designSpec: 'VARCHAR(100) / NOT NULL', physicalSpec: 'VARCHAR(50) / NOT NULL', result: 'TYPE_MISMATCH' },
      { columnName: 'CUST_TEL_NO', logicalName: '고객전화번호', designSpec: 'VARCHAR(20) / NULL', physicalSpec: 'VARCHAR(20) / NULL', result: 'MATCHED' },
      { columnName: 'NICK_NAME', logicalName: '별명(비표준예시)', designSpec: 'VARCHAR(50) / NULL', physicalSpec: '(물리 DB에 컬럼 없음)', result: 'MISSING_COLUMN' },
    ],
  },
  {
    tableName: 'TB_ORDER',
    logicalName: '주문내역',
    status: 'MATCHED',
    gapCount: 0,
    ddl: `-- [TB_ORDER] 설계와 실제 물리 DB가 100% 일치합니다.`,
    columns: [
      { columnName: 'ORD_NO', logicalName: '주문번호', designSpec: 'VARCHAR(20) / PK / NOT NULL', physicalSpec: 'VARCHAR(20) / PK / NOT NULL', result: 'MATCHED' },
      { columnName: 'CUST_NO', logicalName: '고객번호', designSpec: 'VARCHAR(20) / FK / NOT NULL', physicalSpec: 'VARCHAR(20) / FK / NOT NULL', result: 'MATCHED' },
      { columnName: 'ORD_DT', logicalName: '주문일자', designSpec: 'CHAR(8) / NOT NULL', physicalSpec: 'CHAR(8) / NOT NULL', result: 'MATCHED' },
      { columnName: 'PAY_MTHD_CD', logicalName: '결제수단코드', designSpec: 'VARCHAR(10) / NOT NULL', physicalSpec: 'VARCHAR(10) / NOT NULL', result: 'MATCHED' },
      { columnName: 'PAY_AMT', logicalName: '결제금액', designSpec: 'NUMERIC(15,0) / NOT NULL', physicalSpec: 'NUMERIC(15,0) / NOT NULL', result: 'MATCHED' },
    ],
  },
  {
    tableName: 'TB_DELIVERY',
    logicalName: '배송정보',
    status: 'MISSING_IN_DB',
    gapCount: 3,
    ddl: `-- [TB_DELIVERY] 물리 DB 미구현 테이블 생성 SQL\nCREATE TABLE TB_DELIVERY (\n    DLV_NO VARCHAR(20) NOT NULL,\n    ORD_NO VARCHAR(20) NOT NULL,\n    DLV_STAT_CD VARCHAR(10) NOT NULL,\n    CONSTRAINT PK_TB_DELIVERY PRIMARY KEY (DLV_NO)\n);`,
    columns: [
      { columnName: 'DLV_NO', logicalName: '배송번호', designSpec: 'VARCHAR(20) / PK / NOT NULL', physicalSpec: '(테이블 미생성)', result: 'MISSING_COLUMN' },
      { columnName: 'ORD_NO', logicalName: '주문번호', designSpec: 'VARCHAR(20) / FK / NOT NULL', physicalSpec: '(테이블 미생성)', result: 'MISSING_COLUMN' },
      { columnName: 'DLV_STAT_CD', logicalName: '배송상태코드', designSpec: 'VARCHAR(10) / NOT NULL', physicalSpec: '(테이블 미생성)', result: 'MISSING_COLUMN' },
    ],
  },
]
