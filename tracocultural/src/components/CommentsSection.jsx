import React, { useState } from 'react'

const CommentsSection = ({ eventId }) => {
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(0)
  
  // Comentários mockados
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Ana Silva',
      avatar: 'A',
      rating: 5,
      comment: 'Evento incrível! Recomendo muito, organização perfeita.',
      date: '2024-01-15',
      likes: 12
    },
    {
      id: 2,
      user: 'Carlos Santos',
      avatar: 'C',
      rating: 4,
      comment: 'Muito bom, só achei o local um pouco pequeno para a quantidade de pessoas.',
      date: '2024-01-14',
      likes: 8
    },
    {
      id: 3,
      user: 'Maria Oliveira',
      avatar: 'M',
      rating: 5,
      comment: 'Experiência única! Já estou aguardando o próximo evento.',
      date: '2024-01-13',
      likes: 15
    }
  ])

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim() || rating === 0) return

    const comment = {
      id: Date.now(),
      user: 'Você',
      avatar: 'V',
      rating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    }

    setComments([comment, ...comments])
    setNewComment('')
    setRating(0)
  }

  const renderStars = (currentRating) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1
      return (
        <span
          key={index}
          className={`star ${starValue <= currentRating ? 'filled' : ''}`}
        >
          ★
        </span>
      )
    })
  }

  return (
    <div className="comments-section">
      <h2>Comentários e Avaliações</h2>
      
      {/* Formulário para novo comentário */}
      <form className="comment-form" onSubmit={handleSubmitComment}>
        <div className="form-row">
          <div className="comment-input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Compartilhe sua experiência sobre este evento..."
              rows="3"
              required
            />
          </div>
          
          <div className="rating-section">
            <label>Avaliação:</label>
            <div className="stars-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= rating ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-comment-btn">
          <i className="bi bi-send"></i>
          Enviar Comentário
        </button>
      </form>

      {/* Lista de comentários */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <div className="user-info">
                <div className="user-avatar">{comment.avatar}</div>
                <div className="user-details">
                  <span className="user-name">{comment.user}</span>
                  <div className="comment-rating">
                    {renderStars(comment.rating)}
                  </div>
                </div>
              </div>
              <span className="comment-date">{new Date(comment.date).toLocaleDateString('pt-BR')}</span>
            </div>
            
            <p className="comment-text">{comment.comment}</p>
            
            <div className="comment-actions">
              <button className="like-btn">
                <i className="bi bi-heart"></i>
                {comment.likes > 0 && <span>{comment.likes}</span>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsSection