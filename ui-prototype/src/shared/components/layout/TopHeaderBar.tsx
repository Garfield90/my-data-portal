import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { ROLE_OPTIONS, TOP_MENU_ITEMS } from '../../types/navigationTypes'
import type { RoleKey, TopMenuKey } from '../../types/navigationTypes'

interface TopHeaderBarProps {
  activeTopMenu: TopMenuKey
  currentRole: RoleKey
  globalSearchQuery: string
  onSelectTopMenu: (menuKey: TopMenuKey) => void
  onChangeRole: (role: RoleKey) => void
  onChangeSearchQuery: (query: string) => void
  onTriggerGlobalSearch: () => void
}

export function TopHeaderBar({
  activeTopMenu,
  currentRole,
  globalSearchQuery,
  onSelectTopMenu,
  onChangeRole,
  onChangeSearchQuery,
  onTriggerGlobalSearch,
}: TopHeaderBarProps) {
  return (
    <header className="surface-card border-bottom-1 surface-border px-4 py-2 flex align-items-center justify-content-between shadow-1">
      {/* 좌측: 로고 + 상단 대메뉴(GNB) */}
      <div className="flex align-items-center gap-5">
        <div
          className="flex align-items-center gap-2 font-bold text-xl text-primary cursor-pointer"
          onClick={() => onSelectTopMenu('dashboard')}
        >
          <i className="pi pi-database text-2xl" />
          <span>My Data Portal</span>
        </div>

        <nav className="flex align-items-center gap-1">
          {TOP_MENU_ITEMS.filter((menu) => menu.key !== 'system' || currentRole === 'ROLE_SYS_ADMIN').map((menu) => {
            const isActive = activeTopMenu === menu.key
            return (
              <Button
                key={menu.key}
                label={menu.label}
                icon={menu.icon}
                text={!isActive}
                severity={isActive ? undefined : 'secondary'}
                size="small"
                className={isActive ? 'font-bold' : ''}
                onClick={() => onSelectTopMenu(menu.key)}
              />
            )
          })}
        </nav>
      </div>

      {/* 우측: 통합검색 + 현재 역할 전환기 */}
      <div className="flex align-items-center gap-3">
        <div className="flex align-items-center gap-1">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalSearchQuery}
              onChange={(e) => onChangeSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onTriggerGlobalSearch()
              }}
              placeholder="통합검색 (단어·용어·코드·테이블)"
              className="w-16rem p-inputtext-sm"
            />
          </span>
          <Button
            icon="pi pi-search"
            size="small"
            outlined
            tooltip="통합검색 실행"
            onClick={onTriggerGlobalSearch}
          />
        </div>

        <div className="flex align-items-center gap-2">
          <span className="text-sm font-medium text-color-secondary">역할:</span>
          <Dropdown
            value={currentRole}
            options={ROLE_OPTIONS}
            onChange={(e) => onChangeRole(e.value as RoleKey)}
            className="w-16rem p-inputtext-sm"
          />
        </div>
      </div>
    </header>
  )
}
