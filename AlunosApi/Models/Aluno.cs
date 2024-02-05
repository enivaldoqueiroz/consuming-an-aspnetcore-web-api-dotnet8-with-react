using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlunosApi.Models
{
    [Table("Alunos")]
    public class Aluno
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string? Nome { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        public int Idade { get; set; }
    }
}
