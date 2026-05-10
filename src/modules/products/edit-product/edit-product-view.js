export const createEditProductForm = (product) => {
	const editProductForm = document.createElement('form')
	editProductForm.classList.add('edit-product-form')
	editProductForm.innerHTML = /*html*/ `
		<fieldset class="fieldset">
			<label
				for="product-name"
				class="label"
			>Nombre de producto</label>
			<input
				type="text"
				name="product-name"
				id="product-name"
				class="input w-full"
				placeholder="Nombre de producto"
				value="${product.name}"
				required
			/>
			<span
				class="hint text-red-500"
				id="product-name-hint"
			></span>
		</fieldset>

		<div class="flex gap-4">
			<fieldset class="fieldset flex-1">
				<label
					for="product-price"
					class="label"
				>Precio</label>
				<input
					type="number"
					name="product-price"
					id="product-price"
					step="0.01"
					class="input w-full"
					placeholder="Precio"
					min="1"
					value="${product.price}"
					required
				/>
				<span
					class="hint text-red-500"
					id="product-price-hint"
				></span>
			</fieldset>

			<fieldset class="fieldset flex-1">
				<label
					for="product-category"
					class="label"
				>Categoría</label>
				<div class="flex gap-4 mt-2">
					<label>
						<span class="text-sm mr-2">Compra</span>
						<input
							type="radio"
							name="product-category"
							value="compra"
							class="radio radio-xs radio-primary"
							${product.category === 'compra' ? 'checked' : ''}
						/>
					</label>
					<label>
						<span class="text-sm mr-2">Venta</span>
						<input
							type="radio"
							name="product-category"
							value="venta"
							class="radio radio-xs radio-primary"
							${product.category === 'venta' ? 'checked' : ''}

						/>
					</label>
					<span
						class="hint text-red-500"
						id="product-category-hint"
					></span>
				</div>
			</fieldset>
		</div>

		<fieldset class="fieldset">
			<label
				for="product-description"
				class="label"
			>Descripción</label>
			<textarea
				class="textarea h-24 w-full"
				placeholder="Descripción"
				id="product-description"
				name="product-description"
				required
			>${product.description}</textarea>
			<span
				class="hint text-red-500"
				id="product-description-hint"
			></span>
		</fieldset>

		<fieldset class="fieldset">
			<label
				for="product-image"
				class="label"
			>Imagen (opcional)</label>
						
			<input
				type="text"
				name="product-image"
				id="product-image"
				placeholder="https://"
				class="input w-full"
				value=${product.image}
			/>

			<span
				class="hint text-red-500"
				id="product-image-hint"
			></span>
		</fieldset>

		<div class="mt-6">
			<button
				class="btn btn-primary"
				type="submit"
			>Guardar producto</button>
			<button
				class="btn btn-ghost close-modal-btn"
				type="button"
			>Volver</button>
		</div>
	`

	return editProductForm
}
