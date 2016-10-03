<?php

/**
 * Implements hook_rules_action_info().
 *
 * @return array
 */
function purr_messages_rules_action_info() {
  return array(
    'purr_message' => array(
      'label' => t('Show a purr style message on the site'),
      'group' => t('System'),
      'parameter' => array(
        'message' => array(
          'type' => 'text',
          'label' => t('Message'),
          'sanitize' => TRUE,
        ),
        'type' => array(
          'type' => 'text',
          'label' => t('Type'),
          'description' => t("The type of message determines which class(es) will
            be added to the message div and therefore which colour they will be.
            Usually just 'status', 'error', or 'warning', but you can also make a
            message which will remain by using the type 'sticky'."),
          'default value' => 'status',
          'sanitize' => TRUE,
        ),
        'repeat' => array(
          'type' => 'boolean',
          'label' => t('Repeat message'),
          'description' => t("If disabled and the message has been already shown,
            then the message won't be repeated."),
          'default value' => TRUE,
          'optional' => TRUE,
          'restriction' => 'input',
        ),
      ),
      'base' => 'purr_messages_drupal_message',
      'access callback' => 'rules_system_integration_access',
    ),
  );
}

/**
 * Action: Show a purr style message.
 *
 * @param $message
 * @param $type  Error, Status, Warning, Sticky
 * @param $repeat
 */
function purr_messages_drupal_message($message, $type, $repeat) {
  drupal_set_message(filter_xss_admin($message), $type . ' purr', $repeat);
}