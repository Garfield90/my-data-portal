import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import type { SubMenuKey } from '../../types/navigationTypes'

interface GlobalSearchModalProps {
  visible: boolean
  query: string
  onHide: () => void
  onNavigateTab: (subKey: SubMenuKey) => void
}

export function GlobalSearchModal({ visible, query, onHide, onNavigateTab }: GlobalSearchModalProps) {
  return (
    <Dialog
      header={`🔍 통합검색 결과 ${query ? `("${query}")` : '(전체 샘플)'}`}
      visible={visible}
      style={{ width: '680px' }}
      onHide={onHide}
    >
      <div className="flex flex-column gap-3">
        <DataTable
          value={[
            { category: '표준 단어', name: '고객 (CUST)', detail: 'Customer / 금칙어: 손님', targetSub: 'std-word' },
            { category: '표준 용어', name: '고객번호 (CUST_NO)', detail: '번호_V20 / VARCHAR(20)', targetSub: 'std-term' },
            { category: '표준 코드', name: '결제수단코드 (PAY_MTHD_CD)', detail: 'CARD, BANK, V_ACCT, POINT', targetSub: 'std-code' },
            { category: 'ERD 테이블', name: '고객기본 (TB_CUST)', detail: '주문관리 시스템 (ORD) / 컬럼 4개', targetSub: 'mdl-erd' },
          ]}
          stripedRows
          size="small"
        >
          <Column
            field="category"
            header="구분"
            body={(r) => <Tag value={r.category} severity="info" />}
            style={{ width: '20%' }}
          />
          <Column field="name" header="명칭 (논리/물리)" className="font-bold" />
          <Column field="detail" header="요약 정보" />
          <Column
            header="탭으로 열기"
            body={(r) => (
              <Button
                label="화면 이동"
                size="small"
                text
                onClick={() => {
                  onNavigateTab(r.targetSub as SubMenuKey)
                  onHide()
                }}
              />
            )}
          />
        </DataTable>
      </div>
    </Dialog>
  )
}
