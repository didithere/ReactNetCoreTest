using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAPI2.Models;

namespace TestAPI2.Interfaces
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllNotes();
        Task<Note> GetNote(string id);
        void AddNote(Note item);
        Task<bool> RemoveNote(string id);
        void UpdateNote(string id, string body);

        // it should be cautiously used (only in relation with development tests)
        void RemoveAllNotes();
    }
}
