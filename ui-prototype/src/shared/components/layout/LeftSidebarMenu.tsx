import { Button } from 'primereact/button'
import type { SubMenuKey, TopMenuItem } from '../../types/navigationTypes'

interface LeftSidebarMenuProps {
  currentTopMenu: TopMenuItem
  activeSubMenu: SubMenuKey
  collapsed: boolean
  onToggleCollapse: () => void
  onSelectSubMenu: (subKey: SubMenuKey) => void
}

export function LeftSidebarMenu({
  currentTopMenu,
  activeSubMenu,
  collapsed,
  onToggleCollapse,
  onSelectSubMenu,
}: LeftSidebarMenuProps) {
  return (
    <aside
      className="surface-card border-right-1 surface-border flex flex-column justify-content-between p-2 transition-all transition-duration-200"
      style={{ width: collapsed ? '4.2rem' : '15.5rem' }}
    >
      <div className="flex flex-column gap-1">
        {/* 사이드바 상단 대메뉴 제목 + 접기/펴기 버튼 */}
        <div className="flex align-items-center justify-content-between px-2 py-2 border-bottom-1 surface-border mb-1">
          {!collapsed && (
            <span className="font-bold text-sm text-primary flex align-items-center gap-2">
              <i className={currentTopMenu.icon} />
              {currentTopMenu.label}
            </span>
          )}
          <Button
            icon={collapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'}
            text
            rounded
            size="small"
            onClick={onToggleCollapse}
            tooltip={collapsed ? '메뉴 펼치기' : '메뉴 접기'}
          />
        </div>

        {/* 하위 상세 메뉴 목록 */}
        {currentTopMenu.subMenus.map((sub) => (
          <Button
            key={sub.key}
            label={collapsed ? '' : sub.label}
            icon={sub.icon}
            text={activeSubMenu !== sub.key}
            className="w-full text-left justify-content-start"
            size="small"
            tooltip={collapsed ? sub.label : undefined}
            onClick={() => onSelectSubMenu(sub.key)}
          />
        ))}
      </div>

      {/* 사이드바 하단 접기/펴기 버튼 */}
      <div className="border-top-1 surface-border pt-2 flex justify-content-end">
        <Button
          label={collapsed ? '' : '사이드바 접기'}
          icon={collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'}
          text
          size="small"
          className="w-full justify-content-center text-color-secondary"
          onClick={onToggleCollapse}
        />
      </div>
    </aside>
  )
}
