import { Mail, Clock, Users } from 'lucide-react';

const nodeTypes = [
  {
    type: 'coldEmail',
    label: 'Cold Email',
    icon: Mail,
    color: 'text-blue-500'
  },
  {
    type: 'delay',
    label: 'Wait/Delay',
    icon: Clock,
    color: 'text-orange-500'
  },
  {
    type: 'leadSource',
    label: 'Lead Source',
    icon: Users,
    color: 'text-green-500'
  }
];

export function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Flow Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <node.icon className={`h-5 w-5 ${node.color}`} />
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
