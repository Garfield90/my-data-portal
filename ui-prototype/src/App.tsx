import { useState } from 'react'
import { DashboardOverviewPage } from './features/dashboard/components/DashboardOverviewPage'
import { WebErdModelerPage } from './features/model/components/WebErdModelerPage'
import { StandardCodePage } from './features/standard/components/StandardCodePage'
import { StandardDomainPage } from './features/standard/components/StandardDomainPage'
import { StandardTermPage } from './features/standard/components/StandardTermPage'
import { StandardWordPage } from './features/standard/components/StandardWordPage'
import { TermRequestModal } from './features/standard/components/TermRequestModal'
import { SystemManagementPage } from './features/system/components/SystemManagementPage'
import { DbGapVerificationPage } from './features/verification/components/DbGapVerificationPage'
import { GlobalSearchModal } from './shared/components/layout/GlobalSearchModal'
import { LeftSidebarMenu } from './shared/components/layout/LeftSidebarMenu'
import { MdiWorkspaceTabBar } from './shared/components/layout/MdiWorkspaceTabBar'
import { TopHeaderBar } from './shared/components/layout/TopHeaderBar'
import { INITIAL_TERMS } from './shared/data/portalMockData'
import type { TermItem } from './shared/data/portalMockData'
import { ALL_SUB_MENUS, TOP_MENU_ITEMS } from './shared/types/navigationTypes'
import type { RoleKey, SubMenuKey, SubMenuMeta, TopMenuKey } from './shared/types/navigationTypes'

function App() {
  const [activeTopMenu, setActiveTopMenu] = useState<TopMenuKey>('dashboard')
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuKey>('dash-overview')
  const [openTabs, setOpenTabs] = useState<SubMenuMeta[]>([ALL_SUB_MENUS[0]])
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [currentRole, setCurrentRole] = useState<RoleKey>('ROLE_ENT_DA')

  // 상단 통합검색 상태
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('')
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false)

  // 기능 화면별 단위시스템 선택 상태
  const [selectedModelSystem, setSelectedModelSystem] = useState<string>('ORD')
  const [selectedVerifySystem, setSelectedVerifySystem] = useState<string>('ORD')

  // 표준 용어 목록 및 신청 모달 공통 상태
  const [terms, setTerms] = useState<TermItem[]>(INITIAL_TERMS)
  const [isTermModalOpen, setIsTermModalOpen] = useState<boolean>(false)
  const [newTermLogical, setNewTermLogical] = useState<string>('고객휴대전화번호')
  const [newTermDomain, setNewTermDomain] = useState<string>('전화번호_V20')

  const currentTopMenuObj = TOP_MENU_ITEMS.find((m) => m.key === activeTopMenu) ?? TOP_MENU_ITEMS[0]

  // 메뉴/탭 열기 (이미 열린 탭이면 포커스만 이동, 없으면 탭 목록에 추가)
  const handleOpenMenuTab = (subKey: SubMenuKey) => {
    const meta = ALL_SUB_MENUS.find((m) => m.key === subKey)
    if (!meta) return
    setActiveTopMenu(meta.topKey)
    setActiveSubMenu(meta.key)
    setOpenTabs((prev) => (prev.some((t) => t.key === meta.key) ? prev : [...prev, meta]))
  }

  const handleSelectTopMenu = (menuKey: TopMenuKey) => {
    const found = TOP_MENU_ITEMS.find((m) => m.key === menuKey)
    if (found) {
      handleOpenMenuTab(found.defaultSubMenu)
    }
  }

  const handleCloseTab = (e: React.MouseEvent, targetKey: SubMenuKey) => {
    e.stopPropagation()
    const nextTabs = openTabs.filter((t) => t.key !== targetKey)
    if (nextTabs.length === 0) return
    setOpenTabs(nextTabs)
    if (activeSubMenu === targetKey) {
      const fallback = nextTabs[nextTabs.length - 1]
      setActiveTopMenu(fallback.topKey)
      setActiveSubMenu(fallback.key)
    }
  }

  const handleCloseAllTabs = () => {
    const homeTab = ALL_SUB_MENUS[0]
    setOpenTabs([homeTab])
    setActiveTopMenu(homeTab.topKey)
    setActiveSubMenu(homeTab.key)
  }

  const handleApproveTerm = (termId: number) => {
    setTerms((prev) => prev.map((item) => (item.id === termId ? { ...item, status: 'APPROVED' } : item)))
  }

  const handleAddSampleTerm = () => {
    const nextItem: TermItem = {
      id: terms.length + 1,
      logicalName: newTermLogical,
      physicalName: 'CUST_MPHON_NO',
      wordComposition: '고객(CUST) + 휴대전화(MPHON) + 번호(NO)',
      domainName: newTermDomain,
      dataType: 'VARCHAR(20)',
      status: currentRole === 'ROLE_ENT_DA' ? 'APPROVED' : 'REQUESTED',
    }
    setTerms([nextItem, ...terms])
    setIsTermModalOpen(false)
  }

  const renderTabContent = (subKey: SubMenuKey) => {
    switch (subKey) {
      case 'dash-overview':
        return (
          <DashboardOverviewPage
            onOpenTab={handleOpenMenuTab}
            onSelectModelSystem={setSelectedModelSystem}
            onSelectVerifySystem={setSelectedVerifySystem}
          />
        )
      case 'std-word':
        return <StandardWordPage />
      case 'std-domain':
        return <StandardDomainPage />
      case 'std-term':
        return (
          <StandardTermPage
            mode="ALL"
            currentRole={currentRole}
            terms={terms}
            onApproveTerm={handleApproveTerm}
            onOpenRequestModal={() => setIsTermModalOpen(true)}
          />
        )
      case 'std-approval':
        return (
          <StandardTermPage
            mode="APPROVAL_ONLY"
            currentRole={currentRole}
            terms={terms}
            onApproveTerm={handleApproveTerm}
            onOpenRequestModal={() => setIsTermModalOpen(true)}
          />
        )
      case 'std-code':
        return <StandardCodePage />
      case 'mdl-erd':
      case 'mdl-table-list':
        return (
          <WebErdModelerPage
            selectedSystem={selectedModelSystem}
            onChangeSystem={setSelectedModelSystem}
            onRequestNonStandardTerm={(logicalName) => {
              setNewTermLogical(logicalName)
              handleOpenMenuTab('std-term')
              setIsTermModalOpen(true)
            }}
          />
        )
      case 'vrf-gap':
      case 'vrf-batch-history':
        return (
          <DbGapVerificationPage
            selectedSystem={selectedVerifySystem}
            onChangeSystem={setSelectedVerifySystem}
          />
        )
      case 'sys-target':
      case 'sys-db-conn':
        return <SystemManagementPage />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-column surface-ground">
      {/* 1. 상단 고정 헤더 */}
      <TopHeaderBar
        activeTopMenu={activeTopMenu}
        currentRole={currentRole}
        globalSearchQuery={globalSearchQuery}
        onSelectTopMenu={handleSelectTopMenu}
        onChangeRole={setCurrentRole}
        onChangeSearchQuery={setGlobalSearchQuery}
        onTriggerGlobalSearch={() => setIsGlobalSearchOpen(true)}
      />

      {/* 2. 하단 본문 (좌측 사이드바 + 우측 MDI 멀티 탭 & 작업 영역) */}
      <div className="flex flex-1">
        <LeftSidebarMenu
          currentTopMenu={currentTopMenuObj}
          activeSubMenu={activeSubMenu}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onSelectSubMenu={handleOpenMenuTab}
        />

        <div className="flex-1 flex flex-column overflow-hidden">
          <MdiWorkspaceTabBar
            openTabs={openTabs}
            activeSubMenu={activeSubMenu}
            onSelectTab={handleOpenMenuTab}
            onCloseTab={handleCloseTab}
            onCloseAllTabs={handleCloseAllTabs}
          />

          {/* 열린 탭들을 마운트 상태로 유지(Keep-Alive)하여 탭 전환 시에도 각 컴포넌트 내부 상태 보존 */}
          <main className="flex-1 p-4 overflow-auto">
            {openTabs.map((tab) => (
              <div
                key={tab.key}
                style={{ display: activeSubMenu === tab.key ? 'block' : 'none' }}
              >
                {renderTabContent(tab.key)}
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* 공통 모달: 표준 용어 신청 팝업창 */}
      <TermRequestModal
        visible={isTermModalOpen}
        currentRole={currentRole}
        logicalName={newTermLogical}
        domainName={newTermDomain}
        onChangeLogicalName={setNewTermLogical}
        onChangeDomainName={setNewTermDomain}
        onHide={() => setIsTermModalOpen(false)}
        onSubmit={handleAddSampleTerm}
      />

      {/* 공통 모달: 상단 통합검색 결과 팝업창 */}
      <GlobalSearchModal
        visible={isGlobalSearchOpen}
        query={globalSearchQuery}
        onHide={() => setIsGlobalSearchOpen(false)}
        onNavigateTab={handleOpenMenuTab}
      />
    </div>
  )
}

export default App
