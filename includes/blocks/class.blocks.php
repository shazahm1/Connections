<?php

namespace Connections_Directory;

use cnURL as URL;

/**
 * Class Blocks
 *
 * @package Connections_Directory
 */
class Blocks {

	/**
	 * @since 8.31
	 */
	public static function register() {

		if ( ! function_exists( 'register_block_type' ) ) {

			return;
		}

		// Enqueue the editor assets for the blocks.
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueueEditorAssets' ) );

		// Enqueue the frontend block assets.
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueueAssets' ) );

		// Register Connections blocks category.
		add_filter( 'block_categories', array( __CLASS__, 'registerCategories' ), 10, 2 );

		// Register the editor blocks.
		add_action( 'init', 'Connections_Directory\Blocks\Directory::register' );
	}

	/**
	 * Callback for the `enqueue_block_editor_assets` action.
	 *
	 * @since 8.31
	 */
	public static function enqueueEditorAssets() {

		// If SCRIPT_DEBUG is set and TRUE load the non-minified JS files, otherwise, load the minified files.
		//$min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
		$url = URL::makeProtocolRelative( CN_URL );

		\cnScript::enqueueStyles();

		wp_enqueue_script(
			'connections-block-directory',
			"{$url}assets/dist/js/blocks.js",
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ),
			time()
		);

		wp_set_script_translations( 'connections-block-directory', 'connections' );
	}

	/**
	 * Callback for the `enqueue_block_assets` action.
	 *
	 * @since 8.31
	 */
	public static function enqueueAssets() {

		// If SCRIPT_DEBUG is set and TRUE load the non-minified JS files, otherwise, load the minified files.
		//$min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
		$url = URL::makeProtocolRelative( CN_URL );

		//wp_enqueue_style(
		//	'connections-block-directory',
		//	$url . "assets/dist/css/blocks.css",
		//	array(),
		//	time()
		//);
	}

	/**
	 * Callback for the `block_categories` filter.
	 *
	 * Register the Connections category for the blocks.
	 *
	 * @since 8.31
	 *
	 * @param array    $categories Array of block categories.
	 * @param \WP_Post $post       Post being loaded.
	 *
	 * @return array
	 */
	public static function registerCategories( $categories, $post ) {

		$categories[] = array(
			'slug'  => 'connections-directory',
			'title' => 'Connections Business Directory',
			'icon'  => NULL,
		);

		return $categories;
	}
}
