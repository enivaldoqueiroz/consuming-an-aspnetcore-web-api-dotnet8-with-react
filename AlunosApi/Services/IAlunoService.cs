using AlunosApi.Models;
using System.Globalization;

namespace AlunosApi.Sevices
{
    public interface IAlunoService
    {
        Task<IEnumerable<Aluno>> GetAlunos();
        Task<Aluno> GetAlunoById(int id);
        Task<IEnumerable<Aluno>> GetAlunosByNome(string nome);
        Task CreateAluno(Aluno aluno);
        Task UpdateAluno(Aluno aluno);
        Task DeleteAluno(Aluno aluno);
    }
}
