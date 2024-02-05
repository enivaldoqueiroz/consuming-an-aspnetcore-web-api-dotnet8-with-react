using AlunosApi.Models;
using AlunosApi.Sevices;
using Microsoft.AspNetCore.Mvc;

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Produces("application/json")]//DataAnnotation para retorna somente no formato JSON
    public class AlunosController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunoService.GetAlunos();

                return Ok(alunos);
            }
            catch
            {
                //return BadRequest("Request inválido");
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter alunos");
            }
        }

        [HttpGet("GetAlunosByName")]
        [ActionName(nameof(GetAlunosByName))]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByName([FromQuery]string name)
        {
            try
            {
                var alunos = await _alunoService.GetAlunosByNome(name);

                if (alunos.Count() == 0)
                    return NotFound($"Não existem alunos com o critério {name}");

                return Ok(alunos);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("{id:int}",Name ="GetAlunosById")]
        public async Task<ActionResult<Aluno>> GetAlunosById(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAlunoById(id);

                if (aluno == null)
                    return NotFound($"Não existem alunos com o id {id}");

                return Ok(aluno);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateAluno(Aluno aluno)
        {
            try
            {
                await _alunoService.CreateAluno(aluno);

                return CreatedAtAction(nameof(GetAlunosByName), new {id = aluno.Id}, aluno);//CreatedAtAction retorna 201 e inseri no cabeçalho array do objeto recem criado
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPut("{id:int}", Name = "UpdateAluno")]
        public async Task<ActionResult> UpdateAluno(int id,[FromBody] Aluno aluno)
        {
            try
            {
                if (aluno.Id == id)
                {
                    await _alunoService.UpdateAluno(aluno);
                    return Ok($"Aluno com id {id} foi atualizado com sucesso");
                }
                else
                {
                    return BadRequest("Dados inconsistentes");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAlunoById(id);

                if (aluno != null)
                {
                    await _alunoService.DeleteAluno(aluno);
                    return Ok($"Aluno com id {id} foi deletado com sucesso");
                }
                else
                {
                    return NotFound($"Aluno com id = {id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }
    }
}
