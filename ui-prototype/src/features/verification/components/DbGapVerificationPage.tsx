import { useState } from 'react'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { SAMPLE_GAP_TABLES } from '../../../shared/data/portalMockData'
import type { GapTableItem } from '../../../shared/data/portalMockData'
import { SYSTEM_OPTIONS } from '../../../shared/types/navigationTypes'

interface DbGapVerificationPageProps {
  selectedSystem: string
  onChangeSystem: (sysCode: string) => void
}

export function DbGapVerificationPage({
  selectedSystem,
  onChangeSystem,
}: DbGapVerificationPageProps) {
  const [selectedGapTable, setSelectedGapTable] = useState<GapTableItem>(SAMPLE_GAP_TABLES[0])

  return (
    <div className="flex flex-column gap-3">
      {/* 기능 화면 내부의 '검증 대상 단위시스템 선택' 툴바 */}
      <div className="flex justify-content-between align-items-center surface-card p-3 border-round shadow-1">
        <div className="flex align-items-center gap-3">
          <span className="font-bold text-sm">검증 대상 단위시스템:</span>
          <Dropdown
            value={selectedSystem}
            options={SYSTEM_OPTIONS}
            onChange={(e) => onChangeSystem(e.value)}
            className="w-15rem p-inputtext-sm"
          />
        </div>
        <Tag severity="info" value="최근 Spring Batch 카탈로그 적재: 2026-11-09 02:00" />
      </div>

      <div className="grid">
        <div className="col-12 md:col-4">
          <Card title="1. 테이블별 비교 결과">
            <DataTable
              value={SAMPLE_GAP_TABLES}
              selectionMode="single"
              selection={selectedGapTable}
              onSelectionChange={(e) => e.value && setSelectedGapTable(e.value as GapTableItem)}
              dataKey="tableName"
              stripedRows
              size="small"
            >
              <Column field="tableName" header="물리 테이블명" className="font-bold" />
              <Column field="logicalName" header="한글명" />
              <Column
                header="판정 상태"
                body={(row: GapTableItem) => {
                  if (row.status === 'MATCHED') return <Tag severity="success" value="✅ 완전 일치" />
                  if (row.status === 'MODIFIED') return <Tag severity="warning" value={`⚠️ 불일치 (${row.gapCount}건)`} />
                  return <Tag severity="danger" value="🚨 DB 미구현" />
                }}
              />
            </DataTable>
          </Card>
        </div>

        <div className="col-12 md:col-8 flex flex-column gap-3">
          <Card title={`2. [${selectedGapTable.logicalName} (${selectedGapTable.tableName})] 설계 vs 물리 DB 상세 비교`}>
            <DataTable value={selectedGapTable.columns} stripedRows size="small">
              <Column field="columnName" header="컬럼 영문명" className="font-bold" />
              <Column field="logicalName" header="한글명" />
              <Column field="designSpec" header="내 ERD 설계 명세" />
              <Column field="physicalSpec" header="실제 물리 DB (배치 수집)" />
              <Column
                header="비교 판정"
                body={(r) => {
                  if (r.result === 'MATCHED') return <Tag severity="success" value="일치" />
                  if (r.result === 'TYPE_MISMATCH') return <Tag severity="warning" value="❌ 길이 불일치" />
                  return <Tag severity="danger" value="❌ 물리 컬럼 누락" />
                }}
              />
            </DataTable>
          </Card>

          <Card title="3. 💡 불일치 해결용 자동 생성 보정 SQL (DDL)">
            <pre className="surface-900 text-green-300 p-3 border-round text-sm m-0 overflow-auto">
              {selectedGapTable.ddl}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  )
}
