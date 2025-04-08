import { useState } from 'react';
import { Mail, Clock, Users, PanelLeftClose, PanelLeft } from 'lucide-react';

const nodeTypes = [
  {
    type: 'coldEmail',
    label: 'Cold Email',
    icon: Mail,
    color: 'text-blue-500',
  },
  {
    type: 'delay',
    label: 'Wait/Delay',
    icon: Clock,
    color: 'text-orange-500',
  },
  {
    type: 'leadSource',
    label: 'Lead Source',
    icon: Users,
    color: 'text-green-500',
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('text/plain', '');
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-12'
      } bg-white border-r border-gray-200 transition-all duration-300 relative overflow-hidden`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-2 top-2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition z-10"
      >
      {isOpen ? (
        <PanelLeftClose className="h-4 w-4 text-gray-600" />
        ) : (
        <PanelLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>

      <div
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0 invisible'
        } p-4 transition-opacity duration-200`}
      >
        <h2 className="text-lg font-semibold mb-4">Flow Nodes</h2>
        <div className="space-y-2">
          {nodeTypes.map((node) => (
            <div
              key={node.type}
              title={node.label}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 transition-colors"
            >
              <node.icon className={`h-5 w-5 ${node.color}`} />
              <span>{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
