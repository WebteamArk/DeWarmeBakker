<?php

/**
 * @file
 * Display Suite 1 column template with layout wrapper.
 */
?>

<?php
$seasonal = '';
if(isset($node->field_seasonal_product[LANGUAGE_NONE])) {
  $seasonal = $node->field_seasonal_product[LANGUAGE_NONE][0]['value'] == 1 ? ' seasonal-product' : '';
}
?>
<<?php print $layout_wrapper; print $layout_attributes; ?> class="ds-1col <?php print $classes . $seasonal;?> clearfix">

  <?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>

  <<?php print $ds_content_wrapper ?> class="<?php print trim($ds_content_classes); ?>">
    <?php print $ds_content; ?>
  </<?php print $ds_content_wrapper ?>>

</<?php print $layout_wrapper ?>>

<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>