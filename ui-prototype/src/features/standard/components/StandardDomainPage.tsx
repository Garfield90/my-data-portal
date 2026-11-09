import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SAMPLE_DOMAINS } from '../../../shared/data/portalMockData'

export function StandardDomainPage() {
  return (
    <div className="flex flex-column gap-3">
      <div>
        <h2 className="m-0">표준 도메인 사전</h2>
        <small className="text-color-secondary">
          표준 용어의 마지막 단어(분류어)와 연결되어 물리 데이터 타입과 길이를 자동으로 부여하는 기준 사전입니다.
        </small>
      </div>

      <Card>
        <DataTable value={SAMPLE_DOMAINS} stripedRows size="small">
          <Column field="domainGroup" header="도메인 그룹" />
          <Column field="domainName" header="표준 도메인명" className="font-bold" />
          <Column field="logicalType" header="논리 타입" />
          <Column field="physicalType" header="물리 데이터타입(길이)" className="text-primary font-bold" />
          <Column field="desc" header="설명" />
        </DataTable>
      </Card>
    </div>
  )
}
