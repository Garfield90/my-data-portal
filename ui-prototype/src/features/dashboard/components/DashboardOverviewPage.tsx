import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import type { SubMenuKey } from '../../../shared/types/navigationTypes'

interface DashboardOverviewPageProps {
  onOpenTab: (subKey: SubMenuKey) => void
  onSelectModelSystem: (sysCode: string) => void
  onSelectVerifySystem: (sysCode: string) => void
}

export function DashboardOverviewPage({
  onOpenTab,
  onSelectModelSystem,
  onSelectVerifySystem,
}: DashboardOverviewPageProps) {
  return (
    <div className="flex flex-column gap-4">
      <div>
        <h2 className="m-0">전사 데이터 거버넌스 대시보드</h2>
        <small className="text-color-secondary">
          상단 대메뉴나 좌측 메뉴를 클릭하면 위쪽 <b>멀티 탭 바</b>에 화면이 계속 쌓이며 각 화면의 작업 상태가 독립적으로 유지됩니다.
        </small>
      </div>

      <div className="grid">
        <div className="col-12 md:col-3">
          <Card title="승인된 표준 용어" subTitle="단어 320건 / 도메인 45건">
            <div className="text-3xl font-bold text-primary">1,284 건</div>
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card title="승인 대기 신청 건" subTitle="전사DA 검토 필요">
            <div className="flex align-items-center justify-content-between">
              <span className="text-3xl font-bold text-orange-500">5 건</span>
              <Button label="승인 화면 열기" size="small" outlined onClick={() => onOpenTab('std-approval')} />
            </div>
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card title="평균 표준 준수율" subTitle="전사 ERD 설계 컬럼 기준">
            <div className="text-3xl font-bold text-green-600 mb-2">91.4 %</div>
            <ProgressBar value={91.4} showValue={false} style={{ height: '8px' }} />
          </Card>
        </div>
        <div className="col-12 md:col-3">
          <Card title="설계 ↔ 물리DB 일치율" subTitle="오늘 02:00 일배치 적재 기준">
            <div className="text-3xl font-bold text-blue-600 mb-2">86.2 %</div>
            <ProgressBar value={86.2} showValue={false} style={{ height: '8px' }} />
          </Card>
        </div>
      </div>

      <Card title="단위 시스템별 데이터 표준 준수율 및 물리 DB 일치 현황">
        <DataTable
          value={[
            { sysCode: 'ORD', sysName: '주문관리 시스템 (ORD)', tables: 24, cols: 210, stdRate: 88, dbMatchRate: 82, batchTime: '2026-11-09 02:00' },
            { sysCode: 'HR', sysName: '인사관리 시스템 (HR)', tables: 18, cols: 145, stdRate: 96, dbMatchRate: 94, batchTime: '2026-11-09 02:02' },
            { sysCode: 'STL', sysName: '정산관리 시스템 (STL)', tables: 15, cols: 130, stdRate: 90, dbMatchRate: 83, batchTime: '2026-11-09 02:04' },
          ]}
          stripedRows
          size="small"
        >
          <Column field="sysName" header="단위 시스템" />
          <Column field="tables" header="설계 테이블 수" />
          <Column field="cols" header="설계 컬럼 수" />
          <Column
            header="표준 준수율(%)"
            body={(row) => <Tag severity={row.stdRate >= 90 ? 'success' : 'warning'} value={`${row.stdRate}%`} />}
          />
          <Column
            header="설계↔물리DB 일치율(%)"
            body={(row) => <Tag severity={row.dbMatchRate >= 90 ? 'success' : 'warning'} value={`${row.dbMatchRate}%`} />}
          />
          <Column field="batchTime" header="최근 일배치 적재일시" />
          <Column
            header="바로가기 (새 탭 열기)"
            body={(row) => (
              <div className="flex gap-2">
                <Button
                  label="웹 ERD 설계"
                  size="small"
                  outlined
                  onClick={() => {
                    onSelectModelSystem(row.sysCode)
                    onOpenTab('mdl-erd')
                  }}
                />
                <Button
                  label="불일치 검증"
                  size="small"
                  severity="warning"
                  outlined
                  onClick={() => {
                    onSelectVerifySystem(row.sysCode)
                    onOpenTab('vrf-gap')
                  }}
                />
              </div>
            )}
          />
        </DataTable>
      </Card>
    </div>
  )
}
