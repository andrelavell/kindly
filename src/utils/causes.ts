export interface Cause {
  id: number;
  name: string;
  category: string;
}

export const causes: Cause[] = [
  { id: 1, name: "Save the Children", category: "Children" },
  { id: 2, name: "World Wildlife Fund", category: "Environment" },
  { id: 3, name: "Doctors Without Borders", category: "Healthcare" },
  { id: 4, name: "UNICEF", category: "Children" },
  { id: 5, name: "Red Cross", category: "Disaster Relief" }
];
