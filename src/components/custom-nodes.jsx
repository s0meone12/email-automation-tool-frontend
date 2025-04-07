import { Handle, Position } from '@xyflow/react';
import { Mail, Clock, Users } from 'lucide-react';

const nodeStyles = "min-w-[200px] rounded-lg border bg-white p-4 shadow-md";

export function ColdEmailNode({ data }) {
  return (
    <div className={nodeStyles}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-blue-500" />
        <div className="font-medium">Cold Email</div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {data.subject || 'No subject'}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export function DelayNode({ data }) {
  return (
    <div className={nodeStyles}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-orange-500" />
        <div className="font-medium">Wait</div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {data.delay || '1 day'}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export function LeadSourceNode({ data }) {
  return (
    <div className={nodeStyles}>
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-green-500" />
        <div className="font-medium">Lead Source</div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {data.source || 'All Leads'}
      </div>
    </div>
  );
}
