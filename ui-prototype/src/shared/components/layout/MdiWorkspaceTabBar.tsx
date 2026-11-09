import { Button } from 'primereact/button'
import type { SubMenuKey, SubMenuMeta } from '../../types/navigationTypes'

interface MdiWorkspaceTabBarProps {
  openTabs: SubMenuMeta[]
  activeSubMenu: SubMenuKey
  onSelectTab: (subKey: SubMenuKey) => void
  onCloseTab: (e: React.MouseEvent, subKey: SubMenuKey) => void
  onCloseAllTabs: () => void
}

export function MdiWorkspaceTabBar({
  openTabs,
  activeSubMenu,
  onSelectTab,
  onCloseTab,
  onCloseAllTabs,
}: MdiWorkspaceTabBarProps) {
  return (
    <div className="surface-100 border-bottom-1 surface-border px-3 pt-2 flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-1 overflow-x-auto">
        {openTabs.map((tab) => {
          const isTabActive = activeSubMenu === tab.key
          return (
            <div
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`px-3 py-2 border-round-top flex align-items-center gap-2 cursor-pointer text-sm transition-colors transition-duration-150 ${
                isTabActive
                  ? 'surface-card text-primary font-bold border-top-2 border-primary shadow-1'
                  : 'surface-200 text-color-secondary hover:surface-300'
              }`}
            >
              <i className={`${tab.icon} text-xs`} />
              <span>{tab.label}</span>
              {tab.closable && (
                <i
                  className="pi pi-times text-xs ml-1 p-1 border-circle hover:surface-300"
                  onClick={(e) => onCloseTab(e, tab.key)}
                  title="탭 닫기"
                />
              )}
            </div>
          )
        })}
      </div>

      {openTabs.length > 1 && (
        <Button
          label="전체 탭 닫기"
          icon="pi pi-times-circle"
          size="small"
          text
          severity="secondary"
          className="py-1 px-2 text-xs"
          onClick={onCloseAllTabs}
        />
      )}
    </div>
  )
}
