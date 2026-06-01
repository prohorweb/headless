<?php
/**
 * Seed skill groups, projects, and ACF options (run via: wp eval-file /opt/scripts/seed-headless-portfolio.php).
 */

if ( ! function_exists( 'update_field' ) ) {
	echo "ACF not loaded; skip headless seed.\n";
	return;
}

$options_seeded = (bool) get_field( 'site_name', 'option' );
if ( ! $options_seeded ) {
	update_field( 'site_name', 'Engineer Portfolio', 'option' );
update_field( 'hero_badge', 'Available for full-time roles', 'option' );
update_field( 'hero_headline_prefix', "Hello, I'm", 'option' );
update_field( 'hero_name', 'John Developer', 'option' );
update_field( 'hero_subtitle', 'Senior Software Engineer crafting reliable products with headless architecture.', 'option' );
update_field( 'contact_email', 'hello@example.com', 'option' );
update_field( 'contact_website', 'https://example.com', 'option' );
update_field( 'contact_location', 'Remote / Europe', 'option' );

	update_field(
	'experience_items',
	array(
		array(
			'role'        => 'Senior Software Engineer',
			'company'     => 'Tech Company',
			'period'      => '2023 - Present',
			'location'    => 'Remote',
			'description' => 'Led headless transformation, improved deployment speed and API consistency across teams.',
			'tags'        => 'React, GraphQL, WordPress',
		),
		array(
			'role'        => 'Full Stack Developer',
			'company'     => 'Digital Product Studio',
			'period'      => '2021 - 2023',
			'location'    => 'New York, NY',
			'description' => 'Built high-performance React platforms and CMS integrations for enterprise clients.',
			'tags'        => 'React, GraphQL, WordPress',
		),
		array(
			'role'        => 'Software Developer',
			'company'     => 'Startup',
			'period'      => '2019 - 2021',
			'location'    => 'San Francisco, CA',
			'description' => 'Delivered MVPs and scaled architecture from prototype to production.',
			'tags'        => 'React, GraphQL, WordPress',
		),
	),
	'option'
	);
}

$skill_specs = array(
	array(
		'title'   => 'Frontend',
		'content' => '<ul><li>React</li><li>TypeScript</li><li>Vite</li><li>Tailwind CSS</li></ul>',
	),
	array(
		'title'   => 'Backend & APIs',
		'content' => '<ul><li>Node.js</li><li>GraphQL</li><li>REST</li><li>Headless CMS</li></ul>',
	),
	array(
		'title'   => 'Platform',
		'content' => '<ul><li>Docker</li><li>CI/CD</li><li>Linux</li><li>Observability</li></ul>',
	),
	array(
		'title'   => 'Architecture',
		'content' => '<ul><li>System Design</li><li>Code Review</li><li>Performance</li><li>Security</li></ul>',
	),
	array(
		'title'   => 'Data',
		'content' => '<ul><li>PostgreSQL</li><li>Redis</li><li>Migrations</li></ul>',
	),
	array(
		'title'   => 'Quality',
		'content' => '<ul><li>Testing</li><li>Linting</li><li>Smoke checks</li></ul>',
	),
);

foreach ( $skill_specs as $spec ) {
	$slug = sanitize_title( $spec['title'] );
	$existing = get_posts(
		array(
			'post_type'      => 'skill_group',
			'name'           => $slug,
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( ! empty( $existing ) ) {
		continue;
	}
	wp_insert_post(
		array(
			'post_type'    => 'skill_group',
			'post_status'  => 'publish',
			'post_title'   => $spec['title'],
			'post_name'    => $slug,
			'post_content' => $spec['content'],
		)
	);
}

$projects = array(
	array(
		'title'   => 'Headless WordPress Stack',
		'slug'    => 'headless-wordpress-stack',
		'excerpt' => '<p>WordPress as a content backend and React as a decoupled frontend experience.</p>',
		'content' => '<p>Built a stable headless stack with Dockerized services, CMS workflows, and frontend deployment flow.</p>',
	),
	array(
		'title'   => 'Automation Make Workflow',
		'slug'    => 'automation-make-workflow',
		'excerpt' => '<p>Single-command developer workflow for setup, checks, smoke tests, and CI parity.</p>',
		'content' => '<p>Implemented make targets for bootstrap, checks, smoke tests, and release readiness.</p>',
	),
	array(
		'title'   => 'GraphQL Contract Layer',
		'slug'    => 'graphql-contract-layer',
		'excerpt' => '<p>Structured query layer that decouples view rendering from backend schema shifts.</p>',
		'content' => '<p>This project organized query usage around page-level contracts and shared data transforms.</p>',
	),
);

foreach ( $projects as $p ) {
	$found = get_posts(
		array(
			'name'           => $p['slug'],
			'post_type'      => 'project',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( ! empty( $found ) ) {
		continue;
	}
	wp_insert_post(
		array(
			'post_type'    => 'project',
			'post_status'  => 'publish',
			'post_title'   => $p['title'],
			'post_name'    => $p['slug'],
			'post_excerpt' => $p['excerpt'],
			'post_content' => $p['content'],
		)
	);
}

echo "Headless portfolio seed done.\n";
