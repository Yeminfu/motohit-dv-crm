import dbWorker from "@/db/dbWorker2";

export default async function Triggers() {
  const triggers = await getTriggers()
  return <>
    <table className="table table-bordered w-auto">
      <tbody>
        {triggers.map(trigger => <tr key={trigger.TRIGGER_NAME}>
          <th>{trigger.TRIGGER_NAME}</th>
          <th>{trigger.EVENT_MANIPULATION}</th>
          <th>{trigger.EVENT_OBJECT_TABLE}</th>
          <th>{trigger.ACTION_TIMING}</th>
          <th><pre>{trigger.ACTION_STATEMENT}</pre></th>
        </tr>)}
      </tbody>
    </table>
  </>
}

async function getTriggers(): Promise<{
  TRIGGER_NAME: string,
  EVENT_MANIPULATION: string,
  EVENT_OBJECT_TABLE: string,
  ACTION_STATEMENT: string,
  ACTION_TIMING: string,
}[]> {
  const sql = `
  SELECT 
    TRIGGER_NAME, 
    EVENT_MANIPULATION, 
    EVENT_OBJECT_TABLE, 
    ACTION_STATEMENT,
    ACTION_TIMING
  FROM 
      INFORMATION_SCHEMA.TRIGGERS 
  WHERE 
      TRIGGER_SCHEMA = 'motohit_dv_crm';
  `;
  const res = await dbWorker(sql, []);
  return res.result
}