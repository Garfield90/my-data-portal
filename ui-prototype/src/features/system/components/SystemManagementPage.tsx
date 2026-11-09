import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'

export function SystemManagementPage() {
  return (
    <Card title="단위 시스템 및 대상 물리 DB 연결 관리 (시스템관리자)">
      <p className="mt-0 mb-3 text-color-secondary">
        Spring Batch(`batch/`)가 매일 새벽 접속할 단위 시스템별 대상 물리 DB(PostgreSQL 등)의 JDBC 접속 정보와 암호화된 비밀번호를 관리하는 화면입니다.
      </p>
      <DataTable
        value={[
          { sysCode: 'ORD', sysName: '주문관리 시스템', dbms: 'PostgreSQL 16', host: 'ord-db.internal:5432/orddb', schema: 'public', useYn: 'Y' },
          { sysCode: 'HR', sysName: '인사관리 시스템', dbms: 'PostgreSQL 16', host: 'hr-db.internal:5432/hrdb', schema: 'public', useYn: 'Y' },
          { sysCode: 'STL', sysName: '정산관리 시스템', dbms: 'PostgreSQL 16', host: 'stl-db.internal:5432/stldb', schema: 'public', useYn: 'Y' },
        ]}
        stripedRows
        size="small"
      >
        <Column field="sysCode" header="시스템 코드" className="font-bold" />
        <Column field="sysName" header="단위 시스템명" />
        <Column field="dbms" header="대상 DBMS" />
        <Column field="host" header="JDBC 접속 호스트/DB" />
        <Column field="schema" header="대상 스키마" />
        <Column
          field="useYn"
          header="일배치 수집 여부"
          body={(r) => <Tag severity="success" value={r.useYn === 'Y' ? '활성(매일 02:00)' : '중지'} />}
        />
      </DataTable>
    </Card>
  )
}
