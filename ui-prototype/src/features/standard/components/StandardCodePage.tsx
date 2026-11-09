import { useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { SAMPLE_CODE_GROUPS } from '../../../shared/data/portalMockData'
import type { CodeGroup } from '../../../shared/data/portalMockData'

export function StandardCodePage() {
  const [selectedCodeGroup, setSelectedCodeGroup] = useState<CodeGroup>(SAMPLE_CODE_GROUPS[0])

  return (
    <div className="flex flex-column gap-3">
      <div>
        <h2 className="m-0">표준 코드 사전 (왼쪽: 코드 그룹 / 오른쪽: 상세 코드값)</h2>
        <small className="text-color-secondary">
          왼쪽 표에서 코드 그룹을 클릭하면 오른쪽 상세 코드값 표가 즉시 전환됩니다.
        </small>
      </div>

      <div className="grid">
        <div className="col-12 md:col-5">
          <Card title="📁 1. 코드 그룹 목록">
            <DataTable
              value={SAMPLE_CODE_GROUPS}
              selectionMode="single"
              selection={selectedCodeGroup}
              onSelectionChange={(e) => e.value && setSelectedCodeGroup(e.value as CodeGroup)}
              dataKey="codeId"
              stripedRows
              size="small"
            >
              <Column field="codeId" header="표준코드 ID" className="font-bold" />
              <Column field="groupName" header="코드 그룹명" />
              <Column field="domainName" header="도메인" />
              <Column field="useYn" header="사용" />
            </DataTable>
          </Card>
        </div>

        <div className="col-12 md:col-7">
          <Card title={`📄 2. [${selectedCodeGroup.groupName} (${selectedCodeGroup.codeId})] 상세 코드값 목록`}>
            <DataTable value={selectedCodeGroup.items} stripedRows size="small">
              <Column field="sortOrder" header="순서" style={{ width: '15%' }} />
              <Column field="value" header="코드값" className="font-bold text-primary" />
              <Column field="label" header="코드값 한글명" />
              <Column
                field="useYn"
                header="상태"
                body={(row) => <Tag severity="success" value={row.useYn === 'Y' ? '사용중' : '미사용'} />}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  )
}
