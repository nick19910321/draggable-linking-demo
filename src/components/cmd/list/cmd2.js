const cmds = [
  {
    id: "CMD-2-1",
    label: "CMD-2-1",
    items: [
      {
        id: "CMD-2-1-1",
        label: "CMD-2-1-1"
      },
      {
        id: "21-2",
        label: "CMD-2-1-2"
      }
    ]
  },
  {
    id: "CMD-2-2",
    label: "CMD-2-2",
    items: [
      {
        id: "CMD-2-2-1",
        label: "CMD-2-2-1"
      },
      {
        id: "CMD-2-2-2",
        label: "CMD-2-2-2"
      }
    ]
  }
];

export default {
  id: "CMD-2",
  label: "CMD-2",
  children: [...cmds]
};
