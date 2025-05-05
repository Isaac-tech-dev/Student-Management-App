import { countStudents } from "../src/utils/studentUtils";

describe('countStudents', () => {
    it('should return 0 when no students are provided', () => {
      const students: Array<{ id: string; name: string }> = [];
      const result = countStudents(students);
      expect(result).toBe(0);
    });
  
    it('should return 1 when there is one student', () => {
      const students: Array<{ id: string; name: string }> = [
        { id: '1', name: 'John Doe' }
      ];
      const result = countStudents(students);
      expect(result).toBe(1);
    });
  
    it('should return the correct number of students', () => {
      const students: Array<{ id: string; name: string }> = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Doe' },
        { id: '3', name: 'Jim Doe' }
      ];
      const result = countStudents(students);
      expect(result).toBe(3);
    });
  });
