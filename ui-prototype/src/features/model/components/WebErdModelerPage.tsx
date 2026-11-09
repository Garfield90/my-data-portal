import { useState } from 'react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { SAMPLE_ERD_TABLES } from '../../../shared/data/portalMockData'
import type { ErdColumn, ErdTable } from '../../../shared/data/portalMockData'
import { SYSTEM_OPTIONS } from '../../../shared/types/navigationTypes'
import type { ErdViewMode } from '../../../shared/types/navigationTypes'

interface WebErdModelerPageProps {
  selectedSystem: string
  onChangeSystem: (sysCode: string) => void
  onRequestNonStandardTerm: (logicalName: string) => void
}

export function WebErdModelerPage({
  selectedSystem,
  onChangeSystem,
  onRequestNonStandardTerm,
}: WebErdModelerPageProps) {
  const [erdViewMode, setErdViewMode] = useState<ErdViewMode>('BOTH')
  const [selectedErdTable, setSelectedErdTable] = useState<ErdTable>(SAMPLE_ERD_TABLES[0])
  const [isDdlModalOpen, setIsDdlModalOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-column gap-3">
      {/* 기능 화면 내부의 '대상 단위시스템 선택' 툴바 */}
      <div className="flex justify-content-between align-items-center surface-card p-3 border-round shadow-1">
        <div className="flex align-items-center gap-3">
          <div className="flex align-items-center gap-2">
            <span className="font-bold text-sm">대상 단위시스템:</span>
            <Dropdown
              value={selectedSystem}
              options={SYSTEM_OPTIONS}
              onChange={(e) => onChangeSystem(e.value)}
              className="w-15rem p-inputtext-sm"
            />
          </div>

          <div className="flex align-items-center gap-2 ml-3">
            <span className="font-bold text-sm">표시 모드:</span>
            <Button
              label="논리+물리"
              size="small"
              outlined={erdViewMode !== 'BOTH'}
              onClick={() => setErdViewMode('BOTH')}
            />
            <Button
              label="논리(한글)"
              size="small"
              outlined={erdViewMode !== 'LOGICAL'}
              onClick={() => setErdViewMode('LOGICAL')}
            />
            <Button
              label="물리(영문)"
              size="small"
              outlined={erdViewMode !== 'PHYSICAL'}
              onClick={() => setErdViewMode('PHYSICAL')}
            />
          </div>
        </div>

        <div className="flex align-items-center gap-2">
          <Tag severity="warning" value="표준 준수율: 88.9% (비표준 1건)" />
          <Button
            label="📄 PostgreSQL DDL 추출"
            icon="pi pi-code"
            size="small"
            outlined
            onClick={() => setIsDdlModalOpen(true)}
          />
        </div>
      </div>

      {/* 위쪽: ERD 캔버스 영역 */}
      <div
        className="surface-card border-1 surface-border border-round p-4 relative"
        style={{
          height: '310px',
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <small className="text-color-secondary block mb-2">
          💡 캔버스 위의 <b>[고객기본 (TB_CUST)]</b> 또는 <b>[주문내역 (TB_ORDER)]</b> 상자를 클릭하면 아래쪽 컬럼 편집 표가 바뀝니다!
        </small>

        <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="340" y1="130" x2="430" y2="130" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
          <text x="360" y="120" fill="#3b82f6" fontSize="12" fontWeight="bold">
            1 : N (CUST_NO)
          </text>
        </svg>

        {SAMPLE_ERD_TABLES.map((table) => {
          const isSelected = selectedErdTable.id === table.id
          return (
            <div
              key={table.id}
              onClick={() => setSelectedErdTable(table)}
              className="surface-card border-round shadow-3 cursor-pointer absolute"
              style={{
                left: `${table.x}px`,
                top: `${table.y + 20}px`,
                width: '300px',
                border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
              }}
            >
              <div
                className="px-3 py-2 font-bold text-white flex justify-content-between align-items-center"
                style={{ backgroundColor: isSelected ? '#2563eb' : '#475569' }}
              >
                <span>
                  {erdViewMode === 'LOGICAL' && table.logicalName}
                  {erdViewMode === 'PHYSICAL' && table.physicalName}
                  {erdViewMode === 'BOTH' && `${table.logicalName} (${table.physicalName})`}
                </span>
                <i className="pi pi-table" />
              </div>
              <div className="p-2 flex flex-column gap-1 text-sm">
                {table.columns.map((col) => (
                  <div key={col.seq} className="flex justify-content-between align-items-center py-1 border-bottom-1 surface-border">
                    <span>
                      {col.pk && <b className="text-yellow-600 mr-1">🔑PK</b>}
                      {col.fk && <b className="text-blue-600 mr-1">🔗FK</b>}
                      {erdViewMode === 'LOGICAL' && col.logicalName}
                      {erdViewMode === 'PHYSICAL' && col.physicalName}
                      {erdViewMode === 'BOTH' && `${col.logicalName} (${col.physicalName})`}
                    </span>
                    <span className="text-xs text-color-secondary">
                      {!col.standardCompliant ? <Tag severity="warning" value="비표준" /> : col.dataType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* 아래쪽: 선택된 테이블의 컬럼 정의서 편집 그리드 */}
      <Card
        title={`👇 선택한 테이블 상세 컬럼 편집: ${selectedErdTable.logicalName} (${selectedErdTable.physicalName})`}
      >
        <DataTable value={selectedErdTable.columns} stripedRows size="small">
          <Column field="seq" header="순서" style={{ width: '7%' }} />
          <Column field="logicalName" header="컬럼 한글명(논리)" className="font-bold" />
          <Column field="physicalName" header="컬럼 영문명(물리)" />
          <Column field="dataType" header="데이터 타입" />
          <Column header="PK" body={(r: ErdColumn) => (r.pk ? '✅ PK' : '')} />
          <Column header="FK" body={(r: ErdColumn) => (r.fk ? '🔗 FK' : '')} />
          <Column header="NOT NULL" body={(r: ErdColumn) => (r.notNull ? 'Y' : 'N')} />
          <Column
            header="데이터 표준 준수 진단"
            body={(r: ErdColumn) =>
              r.standardCompliant ? (
                <Tag severity="success" value="✅ 표준 용어 준수" />
              ) : (
                <div className="flex align-items-center gap-2">
                  <Tag severity="warning" value="⚠️ 비표준 용어" />
                  <Button
                    label="표준 신청 ->"
                    size="small"
                    outlined
                    onClick={() => onRequestNonStandardTerm(r.logicalName)}
                  />
                </div>
              )
            }
          />
        </DataTable>
      </Card>

      <Dialog
        header={`[${selectedErdTable.physicalName}] 자동 생성된 PostgreSQL DDL`}
        visible={isDdlModalOpen}
        style={{ width: '600px' }}
        onHide={() => setIsDdlModalOpen(false)}
      >
        <pre className="surface-900 text-white p-3 border-round text-sm overflow-auto">
          {`CREATE TABLE ${selectedErdTable.physicalName} (\n` +
            selectedErdTable.columns
              .map((c) => `    ${c.physicalName} ${c.dataType} ${c.notNull ? 'NOT NULL' : 'NULL'}`)
              .join(',\n') +
            `\n);\nCOMMENT ON TABLE ${selectedErdTable.physicalName} IS '${selectedErdTable.logicalName}';`}
        </pre>
      </Dialog>
    </div>
  )
}
