import { Router } from 'express';
import { FavoriteController } from '../controllers/favoriteController';

const router = Router();
const favoriteController = new FavoriteController();

// POST /api/favorites
router.post('/', favoriteController.createFavorite.bind(favoriteController));

// GET /api/favorites
router.get('/', favoriteController.getFavorites.bind(favoriteController));

// GET /api/favorites/:id
router.get('/:id', favoriteController.getFavoriteById.bind(favoriteController));

// PUT /api/favorites/:id
router.put('/:id', favoriteController.updateFavorite.bind(favoriteController));

// DELETE /api/favorites/:id
router.delete('/:id', favoriteController.deleteFavorite.bind(favoriteController));

export default router;
