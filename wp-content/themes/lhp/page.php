<?php get_header(); ?>
	<br/>-- begin page --
	<section id="content" role="main">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			-- entry content --
			<section class="entry-content">
				<?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
				<?php the_content(); ?>
				<div class="entry-links"><?php wp_link_pages(); ?></div>
			</section>
			-- entry content end --
		</article>
<?php endwhile; endif; ?>
</section>
-- end page --
<?php get_footer(); ?>