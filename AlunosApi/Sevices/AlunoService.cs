using AlunosApi.Context;
using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Linq;

namespace AlunosApi.Sevices
{
    public class AlunoService : IAlunoService
    {
        private readonly AppDbContext _appDbContext;

        public AlunoService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            try
            {
                return await _appDbContext.Alunos.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Aluno>> GetAlunosByNome(string nome)
        {
            IEnumerable<Aluno> alunos;
            
            if (!string.IsNullOrEmpty(nome))
            {
                alunos = await _appDbContext.Alunos.Where(a => a.Nome == nome).ToListAsync();
            }
            else
            {
                alunos = await GetAlunos();
            }

            return alunos;
        }

        public async Task<Aluno> GetAluno(int id)
        {
            Aluno aluno = await _appDbContext.Alunos.FindAsync(id);//O metodo FindAsync primeiro procura na mémoria e caso não ache, procura na tabela.

            return aluno;
        }
       
        public async Task CreateAluno(Aluno aluno)
        {
            _appDbContext.Add(aluno);
            await _appDbContext.SaveChangesAsync();

        }

        public async Task UpdateAluno(Aluno aluno)
        {
            _appDbContext.Entry(aluno).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            _appDbContext.Remove(aluno);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
