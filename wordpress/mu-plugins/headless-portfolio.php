<?php
/**
 * Plugin Name: Headless Portfolio
 * Description: CPTs, ACF site options, public GraphQL contact mutation for headless frontend.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register custom post types.
 */
add_action(
	'init',
	function () {
		register_post_type(
			'project',
			array(
				'labels'              => array(
					'name'          => 'Projects',
					'singular_name' => 'Project',
				),
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_rest'        => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'Project',
				'graphql_plural_name' => 'Projects',
				'has_archive'         => false,
				'rewrite'             => array( 'slug' => 'project' ),
				'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
				'menu_icon'           => 'dashicons-portfolio',
			)
		);

		register_post_type(
			'skill_group',
			array(
				'labels'              => array(
					'name'          => 'Skill groups',
					'singular_name' => 'Skill group',
				),
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_rest'        => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'SkillGroup',
				'graphql_plural_name' => 'SkillGroups',
				'has_archive'         => false,
				'rewrite'             => array( 'slug' => 'skill-group' ),
				'supports'            => array( 'title', 'editor' ),
				'menu_icon'           => 'dashicons-editor-ul',
			)
		);

		register_post_type(
			'contact_submission',
			array(
				'labels'              => array(
					'name'          => 'Contact submissions',
					'singular_name' => 'Contact submission',
				),
				'public'              => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_rest'        => false,
				'show_in_graphql'     => false,
				'capability_type'     => 'post',
				'map_meta_cap'        => true,
				'supports'            => array( 'title', 'editor' ),
				'menu_icon'           => 'dashicons-email',
			)
		);
	}
);

/**
 * ACF: options page + field groups.
 */
add_action(
	'acf/init',
	function () {
		if ( ! function_exists( 'acf_add_options_page' ) || ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		acf_add_options_page(
			array(
				'page_title' => 'Site Settings',
				'menu_title' => 'Site Settings',
				'menu_slug'  => 'site-settings',
				'capability' => 'edit_posts',
				'redirect'   => false,
			)
		);

		acf_add_local_field_group(
			array(
				'key'                   => 'group_headless_site',
				'title'                 => 'Site Settings',
				'fields'                => array(
					array(
						'key'   => 'field_site_name',
						'label' => 'Site name (header)',
						'name'  => 'site_name',
						'type'  => 'text',
					),
					array(
						'key'   => 'field_hero_badge',
						'label' => 'Hero badge',
						'name'  => 'hero_badge',
						'type'  => 'text',
					),
					array(
						'key'   => 'field_hero_headline_prefix',
						'label' => 'Hero headline prefix',
						'name'  => 'hero_headline_prefix',
						'type'  => 'text',
					),
					array(
						'key'   => 'field_hero_name',
						'label' => 'Hero name',
						'name'  => 'hero_name',
						'type'  => 'text',
					),
					array(
						'key'   => 'field_hero_subtitle',
						'label' => 'Hero subtitle',
						'name'  => 'hero_subtitle',
						'type'  => 'textarea',
						'rows'  => 3,
					),
					array(
						'key'           => 'field_hero_image',
						'label'         => 'Hero image',
						'name'          => 'hero_image',
						'type'          => 'image',
						'return_format' => 'array',
						'preview_size'  => 'medium',
					),
					array(
						'key'   => 'field_contact_email',
						'label' => 'Contact email (display)',
						'name'  => 'contact_email',
						'type'  => 'email',
					),
					array(
						'key'   => 'field_contact_website',
						'label' => 'Contact website URL',
						'name'  => 'contact_website',
						'type'  => 'url',
					),
					array(
						'key'   => 'field_contact_location',
						'label' => 'Location label',
						'name'  => 'contact_location',
						'type'  => 'text',
					),
					array(
						'key'        => 'field_experience_items',
						'label'      => 'Experience',
						'name'       => 'experience_items',
						'type'       => 'repeater',
						'layout'     => 'block',
						'sub_fields' => array(
							array(
								'key'   => 'field_exp_role',
								'label' => 'Role',
								'name'  => 'role',
								'type'  => 'text',
							),
							array(
								'key'   => 'field_exp_company',
								'label' => 'Company',
								'name'  => 'company',
								'type'  => 'text',
							),
							array(
								'key'   => 'field_exp_period',
								'label' => 'Period',
								'name'  => 'period',
								'type'  => 'text',
							),
							array(
								'key'   => 'field_exp_location',
								'label' => 'Location',
								'name'  => 'location',
								'type'  => 'text',
							),
							array(
								'key'   => 'field_exp_description',
								'label' => 'Description',
								'name'  => 'description',
								'type'  => 'textarea',
								'rows'  => 3,
							),
							array(
								'key'   => 'field_exp_tags',
								'label' => 'Tags (comma-separated)',
								'name'  => 'tags',
								'type'  => 'text',
							),
						),
					),
				),
				'location'              => array(
					array(
						array(
							'param'    => 'options_page',
							'operator' => '==',
							'value'    => 'site-settings',
						),
					),
				),
			)
		);
	}
);

/**
 * Expose ACF options as a stable GraphQL field (admin uses ACF; API reads via get_field).
 */
add_action(
	'graphql_register_types',
	function () {
		if ( ! function_exists( 'get_field' ) ) {
			return;
		}

		register_graphql_object_type(
			'PortfolioExperienceItem',
			array(
				'description' => 'Single experience row',
				'fields'      => array(
					'role'        => array( 'type' => 'String' ),
					'company'     => array( 'type' => 'String' ),
					'period'      => array( 'type' => 'String' ),
					'location'    => array( 'type' => 'String' ),
					'description' => array( 'type' => 'String' ),
					'tags'        => array( 'type' => array( 'list_of' => 'String' ) ),
				),
			)
		);

		register_graphql_object_type(
			'PortfolioSettings',
			array(
				'description' => 'Site options from ACF',
				'fields'      => array(
					'siteName'          => array( 'type' => 'String' ),
					'heroBadge'         => array( 'type' => 'String' ),
					'heroHeadlinePrefix' => array( 'type' => 'String' ),
					'heroName'          => array( 'type' => 'String' ),
					'heroSubtitle'      => array( 'type' => 'String' ),
					'heroImageUrl'      => array( 'type' => 'String' ),
					'heroImageAlt'      => array( 'type' => 'String' ),
					'contactEmail'      => array( 'type' => 'String' ),
					'contactWebsite'    => array( 'type' => 'String' ),
					'contactLocation'   => array( 'type' => 'String' ),
					'experienceItems'   => array( 'type' => array( 'list_of' => 'PortfolioExperienceItem' ) ),
				),
			)
		);

		register_graphql_field(
			'RootQuery',
			'portfolioSettings',
			array(
				'type'    => 'PortfolioSettings',
				'resolve' => function () {
					$hero = get_field( 'hero_image', 'option' );
					$url  = null;
					$alt  = null;
					if ( is_array( $hero ) ) {
						$url = isset( $hero['url'] ) ? $hero['url'] : null;
						$alt = isset( $hero['alt'] ) ? $hero['alt'] : null;
					} elseif ( is_numeric( $hero ) ) {
						$url = wp_get_attachment_url( (int) $hero );
						$alt = get_post_meta( (int) $hero, '_wp_attachment_image_alt', true );
					}

					$exp = get_field( 'experience_items', 'option' );
					$exp_out = array();
					if ( is_array( $exp ) ) {
						foreach ( $exp as $row ) {
							$tags_raw = isset( $row['tags'] ) ? $row['tags'] : '';
							$tags     = array_filter( array_map( 'trim', explode( ',', (string) $tags_raw ) ) );
							$exp_out[] = array(
								'role'        => isset( $row['role'] ) ? $row['role'] : '',
								'company'     => isset( $row['company'] ) ? $row['company'] : '',
								'period'      => isset( $row['period'] ) ? $row['period'] : '',
								'location'    => isset( $row['location'] ) ? $row['location'] : '',
								'description' => isset( $row['description'] ) ? $row['description'] : '',
								'tags'        => $tags,
							);
						}
					}

					return array(
						'siteName'           => get_field( 'site_name', 'option' ),
						'heroBadge'          => get_field( 'hero_badge', 'option' ),
						'heroHeadlinePrefix' => get_field( 'hero_headline_prefix', 'option' ),
						'heroName'           => get_field( 'hero_name', 'option' ),
						'heroSubtitle'       => get_field( 'hero_subtitle', 'option' ),
						'heroImageUrl'       => $url,
						'heroImageAlt'       => $alt ? $alt : '',
						'contactEmail'       => get_field( 'contact_email', 'option' ),
						'contactWebsite'     => get_field( 'contact_website', 'option' ),
						'contactLocation'    => get_field( 'contact_location', 'option' ),
						'experienceItems'    => $exp_out,
					);
				},
			)
		);
	}
);

/**
 * GraphQL: public contact mutation.
 */
add_action(
	'graphql_register_types',
	function () {
		if ( ! function_exists( 'register_graphql_mutation' ) ) {
			return;
		}

		register_graphql_mutation(
			'submitContact',
			array(
				'inputFields'         => array(
					'name'    => array(
						'type'        => array( 'non_null' => 'String' ),
						'description' => 'Sender name',
					),
					'email'   => array(
						'type'        => array( 'non_null' => 'String' ),
						'description' => 'Sender email',
					),
					'message' => array(
						'type'        => array( 'non_null' => 'String' ),
						'description' => 'Message body',
					),
				),
				'outputFields'        => array(
					'success' => array(
						'type'        => 'Boolean',
						'description' => 'Whether the submission was stored',
					),
					'message' => array(
						'type'        => 'String',
						'description' => 'Human-readable status',
					),
				),
				'mutateAndGetPayload' => function ( $input ) {
					$name    = isset( $input['name'] ) ? sanitize_text_field( $input['name'] ) : '';
					$email   = isset( $input['email'] ) ? sanitize_email( $input['email'] ) : '';
					$message = isset( $input['message'] ) ? wp_kses_post( $input['message'] ) : '';

					if ( '' === $name || '' === $email || '' === $message || ! is_email( $email ) ) {
						throw new \GraphQL\Error\UserError( 'Please provide a valid name, email, and message.' );
					}

					$post_id = wp_insert_post(
						array(
							'post_type'    => 'contact_submission',
							'post_status'  => 'private',
							'post_title'   => sprintf( '%s (%s)', $name, $email ),
							'post_content' => $message,
						),
						true
					);

					if ( is_wp_error( $post_id ) ) {
						throw new \GraphQL\Error\UserError( 'Could not save your message. Please try again later.' );
					}

					update_post_meta( $post_id, 'contact_email', $email );
					update_post_meta( $post_id, 'contact_name', $name );

					$admin_email = get_option( 'admin_email' );
					wp_mail(
						$admin_email,
						sprintf( '[Portfolio] Message from %s', $name ),
						sprintf( "Name: %s\nEmail: %s\n\n%s", $name, $email, wp_strip_all_tags( $message ) )
					);

					return array(
						'success' => true,
						'message' => 'Thank you — your message was sent.',
					);
				},
			),
			array(
				'auth' => false,
			)
		);
	}
);
