export type TopMenuKey = 'dashboard' | 'standard' | 'model' | 'verification' | 'system'

export type SubMenuKey =
  | 'dash-overview'
  | 'std-word'
  | 'std-domain'
  | 'std-term'
  | 'std-code'
  | 'std-approval'
  | 'mdl-erd'
  | 'mdl-table-list'
  | 'vrf-gap'
  | 'vrf-batch-history'
  | 'sys-target'
  | 'sys-db-conn'

export type RoleKey = 'ROLE_ENT_DA' | 'ROLE_APP_DA' | 'ROLE_USER' | 'ROLE_SYS_ADMIN'
export type ErdViewMode = 'BOTH' | 'LOGICAL' | 'PHYSICAL'

export interface SubMenuMeta {
  key: SubMenuKey
  topKey: TopMenuKey
  label: string
  icon: string
  closable?: boolean
}

export interface TopMenuItem {
  key: TopMenuKey
  label: string
  icon: string
  defaultSubMenu: SubMenuKey
  subMenus: SubMenuMeta[]
}

export const TOP_MENU_ITEMS: TopMenuItem[] = [
  {
    key: 'dashboard',
    label: '대시보드',
    icon: 'pi pi-chart-bar',
    defaultSubMenu: 'dash-overview',
    subMenus: [
      { key: 'dash-overview', topKey: 'dashboard', label: '전사 통합 현황판', icon: 'pi pi-home', closable: false },
    ],
  },
  {
    key: 'standard',
    label: '데이터 표준',
    icon: 'pi pi-book',
    defaultSubMenu: 'std-term',
    subMenus: [
      { key: 'std-word', topKey: 'standard', label: '표준 단어 사전', icon: 'pi pi-font', closable: true },
      { key: 'std-domain', topKey: 'standard', label: '표준 도메인 사전', icon: 'pi pi-sliders-h', closable: true },
      { key: 'std-term', topKey: 'standard', label: '표준 용어 사전', icon: 'pi pi-book', closable: true },
      { key: 'std-code', topKey: 'standard', label: '표준 코드 사전', icon: 'pi pi-list', closable: true },
      { key: 'std-approval', topKey: 'standard', label: '표준 신청 / 승인', icon: 'pi pi-check-circle', closable: true },
    ],
  },
  {
    key: 'model',
    label: '데이터 모델(ERD)',
    icon: 'pi pi-sitemap',
    defaultSubMenu: 'mdl-erd',
    subMenus: [
      { key: 'mdl-erd', topKey: 'model', label: '웹 ERD 모델러', icon: 'pi pi-sitemap', closable: true },
      { key: 'mdl-table-list', topKey: 'model', label: '테이블/컬럼 정의서', icon: 'pi pi-table', closable: true },
    ],
  },
  {
    key: 'verification',
    label: 'DB 정합성 검증',
    icon: 'pi pi-check-square',
    defaultSubMenu: 'vrf-gap',
    subMenus: [
      { key: 'vrf-gap', topKey: 'verification', label: '설계 ↔ 물리DB 비교', icon: 'pi pi-arrows-h', closable: true },
      { key: 'vrf-batch-history', topKey: 'verification', label: '일배치 변경 이력', icon: 'pi pi-history', closable: true },
    ],
  },
  {
    key: 'system',
    label: '시스템 관리',
    icon: 'pi pi-cog',
    defaultSubMenu: 'sys-target',
    subMenus: [
      { key: 'sys-target', topKey: 'system', label: '단위 시스템 관리', icon: 'pi pi-server', closable: true },
      { key: 'sys-db-conn', topKey: 'system', label: '대상 물리DB 접속관리', icon: 'pi pi-database', closable: true },
    ],
  },
]

export const ALL_SUB_MENUS: SubMenuMeta[] = TOP_MENU_ITEMS.flatMap((t) => t.subMenus)

export const ROLE_OPTIONS = [
  { label: '전사DA (표준 승인·전사 점검)', value: 'ROLE_ENT_DA' },
  { label: '개별시스템DA (ERD 설계·검증)', value: 'ROLE_APP_DA' },
  { label: '일반사용자 (조회·표준 신청)', value: 'ROLE_USER' },
  { label: '시스템관리자 (시스템·DB 설정)', value: 'ROLE_SYS_ADMIN' },
]

export const SYSTEM_OPTIONS = [
  { label: '주문관리 시스템 (ORD)', value: 'ORD' },
  { label: '인사관리 시스템 (HR)', value: 'HR' },
  { label: '정산관리 시스템 (STL)', value: 'STL' },
]
